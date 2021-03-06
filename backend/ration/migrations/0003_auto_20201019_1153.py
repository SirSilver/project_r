# Generated by Django 3.0.8 on 2020-10-19 11:53

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('ration', '0002_auto_20201014_1656'),
    ]

    operations = [
        migrations.AddField(
            model_name='dish',
            name='created_at',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Date of creating'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ingredient',
            name='created_at',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Date of creating'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='menu',
            name='created_at',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Date of creating'),
            preserve_default=False,
        ),
    ]
