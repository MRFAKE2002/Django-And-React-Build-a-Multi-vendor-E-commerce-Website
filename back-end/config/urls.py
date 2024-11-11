"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import permissions
from drf_yasg import openapi
from drf_yasg.views import get_schema_view


"""
    schema_view = get_schema_view(...): 
    این کد نمای مستندات 
    API 
    رو تنظیم می‌کنه. در اینجا، اطلاعات مستندات از جمله عنوان، نسخه، توضیحات و سایر جزئیات 
    API 
    تنظیم می‌شه.

    openapi.Info(...): 
    شامل اطلاعات اصلی 
    API 
    می‌شه، مثل:

    title: 
    عنوان 
    API 
    رو مشخص می‌کنه. در اینجا، عنوان به‌صورت 
    "E-commerce backend APIs" 
    تنظیم شده است.
    
    default_version: 
    نسخه پیش‌فرض 
    API 
    در اینجا 
    v1.
    رو مشخص می‌کنه.
    
    description: 
    توضیح مختصر از 
    API.
    
    terms_of_service: 
    لینک به شرایط استفاده از 
    API.
    
    contact: 
    اطلاعات تماس، مثل ایمیل.
    
    license:
    لایسنس 
    API 
    در اینجا 
    "BSD license".
    رو مشخص می‌کنه.
    
    public=True: 
    تنظیم می‌کنه که این مستندات به صورت عمومی در دسترس باشند.

    permission_classes=(permissions.AllowAny,): 
    مشخص می‌کنه که هر کسی بدون احراز هویت بتونه به این مستندات دسترسی داشته باشه.
"""

schema_view = get_schema_view(
    openapi.Info(
        title = "E-commerce backend APIs",
        default_version= "v1",
        description= "This is documentation for backend API",
        terms_of_service= "http://mywbsite.com/policies/",
        contact= openapi.Contact(email="roozbehbadalis@gmail.com"),
        license= openapi.License(name= "BSD license"),
    ),
    public= True,
    permission_classes= (permissions.AllowAny, )
)


urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # User Register and Login
    path('api/user/', include('userauths.urls')),
    
    # Store urls
    path('api/', include('store.urls')),

    # Document backend API
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema_swagger_ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema_redoc"),

]

# static and media
if settings.DEBUG:  # اطمینان از اینکه فقط در حالت development سرویس‌دهی شود
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
