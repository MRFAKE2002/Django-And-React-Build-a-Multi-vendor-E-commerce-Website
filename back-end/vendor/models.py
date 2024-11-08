# Django
from django.db import models
from django.utils.text import slugify
# My apps
from userauths.models import User


class Vendor(models.Model):
    user = models.OneToOneField(User, related_name="vendor", on_delete=models.CASCADE)
    name = models.CharField(max_length=100, help_text="Shop Name", unique=True)
    slug = models.SlugField(unique=True, max_length=200)
    description = models.TextField(blank=True, null=True)
    mobile = models.CharField(
        max_length=100, help_text="Shop Mobile Number", null=True, blank=True
    )
    image = models.ImageField(
        upload_to="vendors", blank=True, null=True, default="vendor.jpg"
    )
    active = models.BooleanField(default=False)
    datetime_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = ""
        managed = True
        verbose_name = "vendor"
        verbose_name_plural = "vendors"
        ordering = ["datetime_created"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = slugify(self.name)
        super(Vendor, self).save(*args, **kwargs)

