# Evermount Backend Deployment Setup Guide

## Prerequisites
- DigitalOcean Ubuntu 22.04 server
- Domain DNS pointing api.evermount.co to server IP
- NestJS backend running on port 3000 via PM2
- PM2 process name: `evermount-backend`
- Node.js 20 installed
- Yarn installed

---

## Part 1: Nginx + HTTPS Setup

### Step 1: Install Nginx and Certbot

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install Certbot
sudo apt install certbot python3-certbot-nginx -y
```

### Step 2: Create Nginx Configuration

```bash
# Create the config file
sudo nano /etc/nginx/sites-available/api.evermount.co
```

Copy the contents from `nginx-api.evermount.co.conf` into this file.

### Step 3: Enable the Site

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/api.evermount.co /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

### Step 4: Configure Firewall

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Block direct access to port 3000 (if not already blocked)
sudo ufw deny 3000/tcp

# Enable firewall if not already enabled
sudo ufw enable

# Check firewall status
sudo ufw status
```

### Step 5: Obtain SSL Certificate

```bash
# Issue SSL certificate with automatic Nginx configuration
sudo certbot --nginx -d api.evermount.co

# Follow the prompts:
# - Enter email for renewal notices
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (select 2 for redirect)
```

Certbot will automatically update your Nginx config with SSL settings.

### Step 6: Auto-Renewal Setup

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Certbot auto-renewal is already set up via systemd timer
# Verify it's active:
sudo systemctl status certbot.timer
```

### Step 7: Verification Checklist

```bash
# 1. Test HTTP redirect
curl -I http://api.evermount.co
# Should return 301 redirect to HTTPS

# 2. Test HTTPS connection
curl -I https://api.evermount.co
# Should return 200 OK

# 3. Test SSL certificate
openssl s_client -connect api.evermount.co:443 -servername api.evermount.co
# Should show valid certificate

# 4. Test API endpoint
curl https://api.evermount.co/health
# Should return health check response

# 5. Verify Nginx is running
sudo systemctl status nginx

# 6. Verify PM2 process is running
pm2 status evermount-backend

# 7. Check Nginx logs
sudo tail -f /var/log/nginx/api.evermount.co.access.log
sudo tail -f /var/log/nginx/api.evermount.co.error.log
```

---

## Part 2: GitHub Actions Auto-Deployment

### Step 1: Generate SSH Key for GitHub Actions

```bash
# On your local machine, generate SSH key
ssh-keygen -t ed25519 -C "github-actions-evermount" -f ~/.ssh/github_actions_evermount

# This creates:
# - ~/.ssh/github_actions_evermount (private key - add to GitHub Secrets)
# - ~/.ssh/github_actions_evermount.pub (public key - add to server)
```

### Step 2: Add Public Key to Server

```bash
# Copy public key to server
ssh-copy-id -i ~/.ssh/github_actions_evermount.pub root@YOUR_SERVER_IP

# Or manually add to server:
# ssh root@YOUR_SERVER_IP
# echo "YOUR_PUBLIC_KEY" >> ~/.ssh/authorized_keys
```

### Step 3: Test SSH Connection

```bash
# Test SSH connection from your local machine
ssh -i ~/.ssh/github_actions_evermount root@YOUR_SERVER_IP

# If successful, exit and proceed
exit
```

### Step 4: Add GitHub Secrets

Go to your GitHub repository:
1. Navigate to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `SERVER_IP` | Your server's public IP | e.g., `123.456.789.0` |
| `SERVER_SSH_KEY` | Contents of `~/.ssh/github_actions_evermount` | The private key file content |
| `SERVER_USERNAME` | `root` | SSH username (or your sudo user) |

**To get the private key content:**
```bash
cat ~/.ssh/github_actions_evermount
# Copy the entire output including -----BEGIN and -----END lines
```

### Step 5: Create GitHub Actions Workflow

Create the file `.github/workflows/deploy.yml` in your repository with the contents from the generated workflow file.

### Step 6: Verify Deployment Path on Server

```bash
# SSH into server
ssh root@YOUR_SERVER_IP

# Create deployment directory if it doesn't exist
mkdir -p /var/www/evermount-backend

# If repository doesn't exist, clone it:
cd /var/www
git clone YOUR_REPO_URL evermount-backend
cd evermount-backend

# Install dependencies and build
yarn install
yarn build

# Setup PM2 if not already done
pm2 start dist/src/main.js --name evermount-backend
pm2 save
pm2 startup
```

### Step 7: Test Deployment

1. Make a small change to your code
2. Commit and push to `main` branch
3. Go to GitHub → Actions tab
4. Watch the deployment workflow run
5. Verify deployment on server:

```bash
# Check PM2 status
pm2 status evermount-backend

# Check PM2 logs
pm2 logs evermount-backend

# Verify latest code is deployed
cd /var/www/evermount-backend
git log -1
```

---

## Security Best Practices

### 1. Server Hardening

```bash
# Disable root login (create sudo user instead)
# Create new user
adduser deploy
usermod -aG sudo deploy

# Setup SSH key for new user
su - deploy
mkdir -p ~/.ssh
chmod 700 ~/.ssh
# Add your public key to ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Disable password authentication (edit /etc/ssh/sshd_config)
# PasswordAuthentication no
# PermitRootLogin no
sudo systemctl restart sshd
```

### 2. PM2 Security

```bash
# Run PM2 as non-root user
pm2 startup systemd -u deploy --hp /home/deploy
```

### 3. Nginx Security

- Rate limiting is already configured
- Security headers are included
- Hidden files are blocked

### 4. Firewall Rules

```bash
# Only allow necessary ports
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## Troubleshooting

### Nginx Issues

```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx configuration
sudo nginx -t

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/api.evermount.co.error.log

# Restart Nginx
sudo systemctl restart nginx
```

### PM2 Issues

```bash
# Check PM2 status
pm2 status

# View PM2 logs
pm2 logs evermount-backend

# Restart PM2 process
pm2 restart evermount-backend

# Reload PM2 (zero downtime)
pm2 reload evermount-backend
```

### SSL Certificate Issues

```bash
# Check certificate expiration
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

### GitHub Actions Issues

```bash
# Check SSH connection manually
ssh -i ~/.ssh/github_actions_evermount root@YOUR_SERVER_IP

# Verify deployment directory permissions
ls -la /var/www/evermount-backend

# Check git remote
cd /var/www/evermount-backend
git remote -v
```

---

## Monitoring

### Setup PM2 Monitoring (Optional)

```bash
# PM2 Plus (free tier available)
pm2 link YOUR_SECRET_KEY YOUR_PUBLIC_KEY
```

### Setup Uptime Monitoring

Consider using:
- UptimeRobot (free)
- Pingdom
- StatusCake

Monitor: `https://api.evermount.co/health`

---

## Backup Strategy

```bash
# Create backup script
cat > /root/backup-evermount.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup application
tar -czf $BACKUP_DIR/evermount-backend-$DATE.tar.gz /var/www/evermount-backend

# Backup PM2 ecosystem
pm2 save
cp ~/.pm2/dump.pm2 $BACKUP_DIR/pm2-dump-$DATE.pm2

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete
EOF

chmod +x /root/backup-evermount.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /root/backup-evermount.sh
```

---

## Quick Reference Commands

```bash
# Nginx
sudo systemctl status nginx
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx

# PM2
pm2 status
pm2 logs evermount-backend
pm2 restart evermount-backend
pm2 reload evermount-backend
pm2 stop evermount-backend
pm2 delete evermount-backend

# SSL
sudo certbot certificates
sudo certbot renew
sudo certbot renew --dry-run

# Firewall
sudo ufw status
sudo ufw allow 443/tcp
sudo ufw deny 3000/tcp

# Deployment
cd /var/www/evermount-backend
git pull origin main
yarn install
yarn build
pm2 restart evermount-backend
```

---

## Success Checklist

- [ ] Nginx installed and running
- [ ] SSL certificate issued and valid
- [ ] HTTPS redirect working
- [ ] Firewall configured (80, 443 open; 3000 blocked)
- [ ] PM2 process running
- [ ] API accessible via https://api.evermount.co
- [ ] GitHub Actions workflow created
- [ ] GitHub Secrets configured
- [ ] SSH key added to server
- [ ] Test deployment successful
- [ ] Auto-renewal tested
- [ ] Monitoring setup (optional)
- [ ] Backup strategy in place

---

**Your API is now live at: https://api.evermount.co** 🚀

