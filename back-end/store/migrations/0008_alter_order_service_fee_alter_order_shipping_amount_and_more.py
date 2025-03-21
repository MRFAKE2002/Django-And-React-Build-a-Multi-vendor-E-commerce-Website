# Generated by Django 5.1.2 on 2025-03-13 16:17

from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_tax'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='service_fee',
            field=models.DecimalField(decimal_places=2, default=Decimal('0'), max_digits=12),
        ),
        migrations.AlterField(
            model_name='order',
            name='shipping_amount',
            field=models.DecimalField(decimal_places=2, default=Decimal('0'), max_digits=12),
        ),
        migrations.AlterField(
            model_name='order',
            name='sub_total',
            field=models.DecimalField(decimal_places=2, default=Decimal('0'), max_digits=12),
        ),
        migrations.AlterField(
            model_name='order',
            name='tax_fee',
            field=models.DecimalField(decimal_places=2, default=Decimal('0'), max_digits=12),
        ),
        migrations.AlterField(
            model_name='order',
            name='total',
            field=models.DecimalField(decimal_places=2, default=Decimal('0'), max_digits=12),
        ),
    ]
