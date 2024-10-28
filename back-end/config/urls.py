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
    path('admin/', admin.site.urls),
    path('api/', include('userauths.urls')),

    # Document backend API
    path("", schema_view.with_ui("swagger", cache_timeout=0), name="schema_swagger_ui")
]

if settings.DEBUG:  # اطمینان از اینکه فقط در حالت development سرویس‌دهی شود
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
