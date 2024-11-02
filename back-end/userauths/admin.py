from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    # فیلدهای اصلی که در لیست کاربران نمایش داده می‌شود
    list_display = ['id', 'fullname', 'email', 'phone', 'is_active', 'is_staff']
    search_fields = ('fullname', 'email', 'phone')
    list_per_page = 10
    list_filter = ['is_active', 'is_staff', 'date_joined']
    ordering = ['-date_joined']

    # فیلدهایی که فقط خواندنی هستند
    readonly_fields = ['date_joined', 'last_login']

    # تنظیم فیلدها در بخش‌های جداگانه
    """
    fieldsets: فیلدها را در دسته‌بندی‌های مختلف تقسیم‌بندی می‌کند تا مدیریت آن‌ها در پنل ادمین راحت‌تر شود:
    None: namayesh 'email va password' dar bakhsh asli.
    Personal Info: data shakhsi 'user' mesl: 'fullname va phone'.
    Permissions: mojavez va dastresi 'user' mesl 'is_active, is_staff, is_superuser, groups, user_permissions'.
    Important dates: namayesh 'last_login' va 'date_joined' dar bakhsh be esm 'Important dates'.
    """
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('fullname', 'phone','otp')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    # قابلیت اضافه کردن عمل سفارشی برای غیرفعال کردن کاربران انتخاب شده
    actions = ['deactivate_users']

    def deactivate_users(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, "کاربران انتخاب شده غیرفعال شدند.")
    deactivate_users.short_description = "غیرفعال کردن کاربران انتخاب شده"

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'country', 'gender', 'date_created']
    search_fields = ('user__fullname', 'country', 'city')
    list_per_page = 10
    list_filter = ['date_created', 'country', 'city']
    list_select_related = ['user']
    readonly_fields = ['date_created', 'date_updated']

    # تنظیم فیلدها در بخش‌های جداگانه
    fieldsets = (
        (None, {'fields': ('user', 'image')}),
        ('Personal Info', {'fields': ('about', 'gender', 'country', 'city', 'address')}),
        ('Dates', {'fields': ('date_created', 'date_updated')}),
    )

    # اضافه کردن عمل سفارشی برای پاک کردن عکس پروفایل کاربران انتخاب شده
    actions = ['remove_profile_image']

    def remove_profile_image(self, request, queryset):
        queryset.update(image='default/default.jpg')
        self.message_user(request, "عکس پروفایل کاربران انتخاب شده پاک شد.")
    remove_profile_image.short_description = "پاک کردن عکس پروفایل کاربران انتخاب شده"
