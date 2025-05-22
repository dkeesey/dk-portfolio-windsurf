---
title: "Increasing Upload File Size Limits in Docker WordPress Environments"
description: "A comprehensive guide to overcoming file upload size limitations when working with WordPress in Docker containers, especially for site migrations."
publishDate: 2025-03-20
tags: ["wordpress", "docker", "development", "file upload", "migration", "php"]
image: "/images/blog/docker-wordpress.jpg"
readingTime: 10
author: "Dean Keesey"
---

# Increasing Upload File Size Limits in Docker WordPress Environments

When working with WordPress in Docker environments, one of the most common challenges is hitting file upload size limitations. This becomes particularly problematic when migrating sites using plugins like All-in-One WP Migration, which often need to handle large backup files.

After wrestling with this issue on a recent client project, I've documented the complete solution for future reference — and to save you the headache.

## The Problem: Restrictive Default Upload Limits

By default, WordPress installations in Docker containers typically have restrictive upload limits:
- `upload_max_filesize`: 64MB
- `post_max_size`: 64MB
- `memory_limit`: 256MB

These limits prevent you from importing larger backups or uploading media files like high-resolution images and videos. Most frustratingly, these limits may be enforced in multiple places, so changing just one configuration file often doesn't solve the problem.

## The Multi-Layered Solution

Through testing, I discovered that PHP configuration settings need to be modified in several locations to properly increase upload limits in a Docker WordPress environment:

### 1. Modifying php.ini Directly

The most direct approach is to create or modify the main PHP configuration file:

```bash
docker-compose exec wordpress bash -c "echo 'upload_max_filesize = 512M' > /usr/local/etc/php/php.ini && \
echo 'post_max_size = 512M' >> /usr/local/etc/php/php.ini && \
echo 'memory_limit = 512M' >> /usr/local/etc/php/php.ini && \
echo 'max_execution_time = 300' >> /usr/local/etc/php/php.ini"
```

### 2. Adding PHP Configuration in wp-config.php

WordPress's configuration file can also be used to set PHP limits. The key is to place these definitions *before* WordPress core files are included:

```php
// Add any custom values between this line and the "stop editing" line.
define("WP_MEMORY_LIMIT", "512M");
@ini_set('upload_max_filesize', '512M');
@ini_set('post_max_size', '512M');
@ini_set('memory_limit', '512M');
@ini_set('max_execution_time', '300');
@ini_set('max_input_time', '300');
```

A common mistake is adding these settings at the very end of wp-config.php, after WordPress is already loaded, which will trigger warnings about headers already being sent.

### 3. Using .htaccess (For Apache-based Containers)

If your WordPress Docker container uses Apache, you can modify .htaccess:

```
php_value upload_max_filesize 512M
php_value post_max_size 512M
php_value memory_limit 512M
php_value max_execution_time 300
php_value max_input_time 300
```

### 4. Creating a Must-Use Plugin

One of the most reliable approaches I found was creating a must-use plugin:

```php
<?php
/**
 * Plugin Name: Custom Upload Size Settings
 * Description: Increases PHP upload limits
 * Version: 1.0
 */

// Increase PHP limits
@ini_set('upload_max_filesize', '512M');
@ini_set('post_max_size', '512M');
@ini_set('memory_limit', '512M');
@ini_set('max_execution_time', '300');
@ini_set('max_input_time', '300');
```

Save this file in `/wp-content/mu-plugins/` inside your Docker container. Must-use plugins load automatically before regular plugins, ensuring these settings are applied early.

### 5. Plugin-Specific Modifications

Some plugins, like All-in-One WP Migration, have their own internal size limitations. For this plugin, you need to modify its constants.php file to increase the maximum chunk size:

```php
// Change this line in all-in-one-wp-migration/constants.php
define('AI1WM_MAX_CHUNK_SIZE', 512 * 1024 * 1024);
```

## Verifying Your Changes

To confirm your changes have taken effect, run this command against your container:

```bash
docker-compose exec wordpress php -r "echo 'upload_max_filesize: ' . ini_get('upload_max_filesize') . PHP_EOL . 'post_max_size: ' . ini_get('post_max_size') . PHP_EOL . 'memory_limit: ' . ini_get('memory_limit') . PHP_EOL;"
```

If you're still seeing lower values than expected, it means your settings aren't being applied correctly.

## Key Takeaways from My Experience

After spending hours debugging various configuration issues, I've learned several important lessons:

1. **Multiple configuration points**: PHP settings can be controlled from multiple locations, and you may need to modify several to ensure settings take effect.

2. **Order matters**: Some configuration options override others, so the order in which they are loaded is critical.

3. **Container restart required**: Always restart your WordPress container after making configuration changes:
   ```bash
   docker-compose restart wordpress
   ```

4. **Plugin-specific limits**: Some plugins have their own size limitations that need to be modified separately.

5. **Alternative migration approaches**: If you continue to struggle with file size limits, consider breaking up your migration into smaller pieces or using alternative migration plugins like Duplicator that may handle large files differently.

6. **Error checking**: Watch for PHP warnings in your website header or in the error logs, as they can indicate configuration problems.

## Docker-Compose Configuration for Higher Limits

If you're setting up a new WordPress Docker environment, you can build these higher limits directly into your docker-compose.yml file:

```yaml
services:
  wordpress:
    image: wordpress:latest
    volumes:
      - ./wp-content:/var/www/html/wp-content
      - ./uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
    # other configuration...

# Then create an uploads.ini file with:
# file_uploads = On
# memory_limit = 512M
# upload_max_filesize = 512M
# post_max_size = 512M
# max_execution_time = 300
```

## Conclusion

Increasing upload file size limits in Docker WordPress environments can be surprisingly complex due to the layered nature of PHP configuration. By understanding all the places where these limits are defined, you can overcome this common challenge and smoothly migrate large WordPress sites.

I hope this guide helps save you time on your next Docker WordPress project. If you've encountered other solutions or have additional tips, I'd love to hear about them in the comments!

---

*Note: This solution was documented while working on a website migration project for a therapy practice. The approaches outlined here have been tested on WordPress running in Docker containers with PHP 7.4 and 8.x.*
