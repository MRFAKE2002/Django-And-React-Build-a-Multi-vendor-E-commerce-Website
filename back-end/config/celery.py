# config/celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# تنظیمات برای Celery و اتصال به پیکربندی Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')

# بارگذاری تنظیمات Celery از فایل settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# وظایف را از اپلیکیشن‌های Django بارگذاری می‌کنیم
app.autodiscover_tasks()
