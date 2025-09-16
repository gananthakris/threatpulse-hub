import * as React from "react";
import { Box, Typography, Paper, Button, Card, CardContent } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          🛡️ ThreatPulse Intelligence Hub
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>
          Advanced Cyber Threat Intelligence & Real-Time Malware Analysis Platform
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          border: '1px solid',
          borderColor: 'rgba(96, 93, 255, 0.1)',
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(96, 93, 255, 0.08)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #605dff, #7c3aed, #605dff)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite linear'
          },
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '200% 0' },
            '100%': { backgroundPosition: '-200% 0' }
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 50px rgba(96, 93, 255, 0.12)'
          }
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          🚀 Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Link href="/malware-dashboard" passHref style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #605dff 0%, #7c3aed 100%)',
                boxShadow: '0 4px 15px rgba(96, 93, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1.2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5451f0 0%, #6e2ed8 100%)',
                  boxShadow: '0 6px 20px rgba(96, 93, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)'
                },
                '&:active': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 10px rgba(96, 93, 255, 0.3), inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              Open Malware Dashboard
            </Button>
          </Link>
          <Button 
            variant="outlined" 
            size="large"
            sx={{
              borderColor: 'primary.main',
              borderWidth: '2px',
              color: 'primary.main',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.2,
              backgroundColor: 'rgba(96, 93, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 2px 8px rgba(96, 93, 255, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(96, 93, 255, 0.15)',
                boxShadow: '0 4px 12px rgba(96, 93, 255, 0.2)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            View Dashboard
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            sx={{
              borderColor: 'primary.main',
              borderWidth: '2px',
              color: 'primary.main',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.2,
              backgroundColor: 'rgba(96, 93, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 2px 8px rgba(96, 93, 255, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(96, 93, 255, 0.15)',
                boxShadow: '0 4px 12px rgba(96, 93, 255, 0.2)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            Settings
          </Button>
        </Box>
      </Paper>

      {/* Stats and Getting Started */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(96, 93, 255, 0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
              },
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 40px rgba(96, 93, 255, 0.1)',
                borderColor: 'primary.main'
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                📊 Your Stats
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body1">Items: 0</Typography>
                <Typography variant="body1">Views: 0</Typography>
                <Typography variant="body1">Users: 1</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(96, 93, 255, 0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
              },
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 40px rgba(96, 93, 255, 0.1)',
                borderColor: 'primary.main'
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                📝 Getting Started
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">☐ Set up your profile</Typography>
                <Typography variant="body2">☐ Create your first item</Typography>
                <Typography variant="body2">☐ Explore advanced features</Typography>
                <Typography variant="body2">☐ Invite team members</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Pro Tip */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mt: 4,
          border: '1px solid',
          borderColor: 'warning.light',
          backgroundColor: 'warning.50',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          💡 Pro Tip
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Ask AI to add new features! Try saying "Add a contact form" or "Create a user dashboard" and 
          watch the magic happen with our hidden component library.
        </Typography>
      </Paper>
    </Box>
  );
}