"use client";

import * as React from "react";
import { Box, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Chip, Tab, Tabs, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import type { Schema } from "../../../amplify/data/resource";
import outputs from "../../../amplify_outputs.json";

// Configure Amplify
Amplify.configure(outputs);

// Generate the data client
const client = generateClient<Schema>();

interface TableData {
  [key: string]: any;
}

interface Model {
  name: string;
  fields: Record<string, any>;
  pluralName: string;
}

export default function DataPage() {
  const [models, setModels] = React.useState<Model[]>([]);
  const [currentTable, setCurrentTable] = React.useState<string>("");
  const [tableData, setTableData] = React.useState<TableData[]>([]);
  const [tableCounts, setTableCounts] = React.useState<Record<string, number>>({});
  const [loading, setLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'create' | 'edit'>('create');
  const [selectedRecord, setSelectedRecord] = React.useState<TableData | null>(null);
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [error, setError] = React.useState<string | null>(null);

  // Store enums from amplify_outputs
  const [enums, setEnums] = React.useState<Record<string, string[]>>({});

  // Get models dynamically from amplify_outputs.json
  React.useEffect(() => {
    // Extract models from the outputs configuration
    const modelIntrospection = outputs.data?.model_introspection;
    if (!modelIntrospection?.models) {
      console.error('No model introspection found in amplify_outputs.json');
      return;
    }

    // Extract enums
    const enumData: Record<string, string[]> = {};
    if (modelIntrospection.enums) {
      Object.entries(modelIntrospection.enums).forEach(([enumName, enumDef]: [string, any]) => {
        enumData[enumName] = enumDef.values || [];
      });
    }
    setEnums(enumData);

    const modelList: Model[] = Object.entries(modelIntrospection.models).map(([name, modelDef]: [string, any]) => {
      // Extract fields excluding system fields
      const fields: Record<string, any> = {};
      Object.entries(modelDef.fields || {}).forEach(([fieldName, fieldDef]: [string, any]) => {
        // Skip system fields
        if (!['id', 'createdAt', 'updatedAt', 'owner', '__typename'].includes(fieldName)) {
          // Map field types
          let fieldType = fieldDef.type;
          
          // Check if type is an object (could be enum or other complex type)
          if (typeof fieldDef.type === 'object' && fieldDef.type.enum) {
            // This is an enum type
            fieldType = { type: 'enum', enumName: fieldDef.type.enum };
          } else if (fieldDef.type === 'String') {
            fieldType = 'string';
          } else if (fieldDef.type === 'Int') {
            fieldType = 'integer';
          } else if (fieldDef.type === 'Float') {
            fieldType = 'float';
          } else if (fieldDef.type === 'Boolean') {
            fieldType = 'boolean';
          } else if (fieldDef.type === 'AWSDateTime') {
            fieldType = 'datetime';
          } else if (fieldDef.type === 'AWSJSON') {
            fieldType = 'json';
          }
          
          fields[fieldName] = fieldType;
        }
      });

      return {
        name,
        fields,
        pluralName: modelDef.pluralName || `${name}s`
      };
    });

    setModels(modelList);
    
    // Set first model as default
    if (modelList.length > 0) {
      setCurrentTable(modelList[0].name);
    }
  }, []);

  // Load data for current table
  const loadTableData = React.useCallback(async () => {
    if (!currentTable) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Dynamically call the correct model based on currentTable
      const result = await (client.models as any)[currentTable].list();
      const data = result.data || [];
      setTableData(data);
      
      // Update the count for this specific table
      setTableCounts(prev => ({
        ...prev,
        [currentTable]: data.length
      }));
    } catch (err) {
      console.error(`Error loading ${currentTable} data:`, err);
      setError(`Failed to load ${currentTable} data`);
    } finally {
      setLoading(false);
    }
  }, [currentTable]);

  // Load counts for all tables
  const loadAllTableCounts = React.useCallback(async () => {
    if (models.length === 0) return;
    
    const counts: Record<string, number> = {};
    
    try {
      for (const model of models) {
        const result = await (client.models as any)[model.name].list();
        counts[model.name] = (result.data || []).length;
      }
      setTableCounts(counts);
    } catch (err) {
      console.error('Error loading table counts:', err);
    }
  }, [models]);

  React.useEffect(() => {
    if (currentTable) {
      loadTableData();
    }
  }, [currentTable, loadTableData]);

  // Load all table counts when models are loaded
  React.useEffect(() => {
    if (models.length > 0) {
      loadAllTableCounts();
    }
  }, [models, loadAllTableCounts]);

  // Get current model
  const currentModel = models.find(m => m.name === currentTable);

  // Helper function to render form inputs based on field type
  const renderFormInput = (fieldName: string, fieldType: any, value: any, onChange: (value: any) => void) => {
    // Check if this is a simple type string or a field definition object
    const isEnumType = typeof fieldType === 'object' && fieldType.type === 'enum';
    const actualType = typeof fieldType === 'string' ? fieldType : fieldType.type;
    
    if (actualType === 'boolean') {
      return (
        <FormControlLabel
          control={
            <Switch
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
            />
          }
          label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
        />
      );
    }
    
    // Handle enum types dynamically
    if (isEnumType && fieldType.enumName) {
      const enumValues = enums[fieldType.enumName] || [];
      return (
        <FormControl fullWidth>
          <InputLabel>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</InputLabel>
          <Select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          >
            {enumValues.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    
    return (
      <TextField
        label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        type={
          actualType === 'integer' || actualType === 'float' ? 'number' :
          actualType === 'email' ? 'email' : 'text'
        }
        multiline={fieldName.includes('content') || fieldName.includes('description') || fieldName.includes('bio')}
        rows={fieldName.includes('content') || fieldName.includes('description') || fieldName.includes('bio') ? 3 : 1}
        fullWidth
      />
    );
  };

  // Generate columns for DataGrid
  const generateColumns = (model: Model): GridColDef[] => {
    if (!model) return [];
    
    const columns: GridColDef[] = [];
    
    // Always add ID column first
    columns.push({
      field: 'id',
      headerName: 'ID',
      width: 200,
    });
    
    // Add field columns
    Object.entries(model.fields).forEach(([fieldName, fieldType]) => {
      columns.push({
        field: fieldName,
        headerName: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
        width: 150,
        flex: fieldName === 'content' || fieldName === 'description' ? 1 : 0,
        renderCell: fieldType === 'boolean' ? (params) => params.value ? '✅' : '❌' : undefined,
      });
    });
    
    // Add system columns
    columns.push({
      field: 'createdAt',
      headerName: 'Created',
      width: 180,
      type: 'dateTime',
      valueGetter: (value) => value ? new Date(value) : null,
    });
    
    columns.push({
      field: 'updatedAt',
      headerName: 'Updated',
      width: 180,
      type: 'dateTime',
      valueGetter: (value) => value ? new Date(value) : null,
    });

    // Add actions column
    columns.push({
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            size="small" 
            variant="outlined" 
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button 
            size="small" 
            variant="outlined" 
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    });

    return columns;
  };

  // Handle create new record
  const handleCreate = () => {
    setDialogMode('create');
    setSelectedRecord(null);
    setFormData({});
    setOpenDialog(true);
  };

  // Handle edit record
  const handleEdit = (record: TableData) => {
    setDialogMode('edit');
    setSelectedRecord(record);
    setFormData({ ...record });
    setOpenDialog(true);
  };

  // Handle delete record
  const handleDelete = async (id: string) => {
    if (!currentTable || !window.confirm('Are you sure you want to delete this record?')) return;

    setLoading(true);
    try {
      await (client.models as any)[currentTable].delete({ id });
      await loadTableData();
      // Also refresh all counts to keep them in sync
      await loadAllTableCounts();
    } catch (err) {
      console.error('Error deleting record:', err);
      setError('Failed to delete record');
    } finally {
      setLoading(false);
    }
  };

  // Handle save (create or update)
  const handleSave = async () => {
    if (!currentTable || !currentModel) return;

    setLoading(true);
    setError(null);

    try {
      const saveData = { ...formData };
      
      // Remove readonly fields for create/update
      delete saveData.id;
      delete saveData.createdAt;
      delete saveData.updatedAt;

      if (dialogMode === 'create') {
        await (client.models as any)[currentTable].create(saveData);
      } else if (selectedRecord) {
        await (client.models as any)[currentTable].update({
          id: selectedRecord.id,
          ...saveData
        });
      }

      setOpenDialog(false);
      await loadTableData();
      // Also refresh all counts to keep them in sync
      await loadAllTableCounts();
    } catch (err) {
      console.error('Error saving record:', err);
      setError('Failed to save record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          🗄️ Database Tables
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Manage your Amplify data models dynamically
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Model Tabs */}
      {models.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={currentTable}
            onChange={(_, newValue) => setCurrentTable(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {models.map((model) => (
              <Tab
                key={model.name}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {model.name}
                    <Chip 
                      label={tableCounts[model.name] || 0} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                }
                value={model.name}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Current Table Data */}
      {currentModel && (
        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {currentModel.pluralName} ({tableData.length} records)
              </Typography>
              <Button
                variant="contained"
                onClick={handleCreate}
                startIcon={<Typography sx={{ fontSize: '18px' }}>+</Typography>}
              >
                Add New {currentModel.name}
              </Button>
            </Box>

            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={tableData}
                columns={generateColumns(currentModel)}
                loading={loading}
                pageSizeOptions={[5, 10, 25, 50]}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  '& .MuiDataGrid-root': {
                    border: 'none',
                  },
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid #f0f0f0',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f8f9fa',
                    borderBottom: '2px solid #e0e0e0',
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogMode === 'create' ? `Create New ${currentModel?.name}` : `Edit ${currentModel?.name}`}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {currentModel && Object.entries(currentModel.fields)
              .map(([fieldName, fieldType]) => (
                <Box key={fieldName}>
                  {renderFormInput(
                    fieldName, 
                    fieldType, 
                    formData[fieldName], 
                    (value) => setFormData({ ...formData, [fieldName]: value })
                  )}
                </Box>
              ))
            }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={loading}>
            {dialogMode === 'create' ? 'Create' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* No Models Message */}
      {models.length === 0 && (
        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            textAlign: 'center',
            py: 6
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
              No data models found
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Make sure your Amplify backend is deployed with data models configured.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}