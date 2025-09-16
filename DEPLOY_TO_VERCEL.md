# 🚀 Deploy ThreatPulse to Vercel in 60 Seconds

## Quick Deploy (One Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgananthakris%2Fthreatpulse-hub&project-name=threatpulse-hub&repository-name=threatpulse-hub)

## Manual Deploy Steps

### 1. Go to Vercel Import
**Link:** https://vercel.com/import/git

### 2. Import Your Repository
- Paste: `https://github.com/gananthakris/threatpulse-hub`
- Click **Import**

### 3. Configure Project (Auto-detected)
- Framework: **Next.js** (auto-detected)
- Root Directory: `.` (leave as is)
- Build Command: `npm run build` (auto-detected)

### 4. Environment Variables (Optional)
Add if needed:
```
NEXT_PUBLIC_API_ENDPOINT=https://mb-api.abuse.ch/api/v1/
```

### 5. Click Deploy
- Takes ~2-3 minutes
- Automatic SSL certificate
- Global CDN deployment

## Your Live URLs

Once deployed, you'll get:
- **Production:** `https://threatpulse-hub.vercel.app`
- **Preview:** `https://threatpulse-hub-[username].vercel.app`

## Features Included

✅ **Instant Deployment**
- Zero configuration needed
- Automatic builds on every push

✅ **Global Performance**
- Edge network (200+ locations)
- Automatic image optimization
- Smart caching

✅ **Developer Experience**
- Preview deployments for PRs
- Rollback to any deployment
- Analytics dashboard

## Post-Deployment

### Custom Domain (Optional)
1. Go to Settings → Domains
2. Add your domain (e.g., `threatpulse.com`)
3. Update DNS records as shown

### Monitor Performance
- Visit: https://vercel.com/[your-username]/threatpulse-hub
- View analytics, logs, and performance metrics

## Troubleshooting

### Build Fails?
- Check Node version (needs 18+)
- Verify all dependencies in package.json
- Check build logs in Vercel dashboard

### Environment Variables
- Add in Settings → Environment Variables
- Redeploy after adding

## Success! 🎉
Your ThreatPulse Intelligence Hub is now live and accessible worldwide!