# Generated by Django 3.0.8 on 2020-10-20 04:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ration', '0003_auto_20201019_1153'),
    ]

    operations = [
        migrations.AddField(
            model_name='dish',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='dishes/%Y/%m/%d', verbose_name='Dish image'),
        ),
        migrations.AddField(
            model_name='menu',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='menus/%Y/%m/%d', verbose_name='Menu image'),
        ),
        migrations.AlterField(
            model_name='dish',
            name='description',
            field=models.TextField(verbose_name='Detail description'),
        ),
        migrations.AlterField(
            model_name='dish',
            name='name',
            field=models.CharField(max_length=50, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='menu',
            name='description',
            field=models.TextField(verbose_name='Detail description'),
        ),
        migrations.AlterField(
            model_name='menu',
            name='name',
            field=models.CharField(max_length=50, verbose_name='Name'),
        ),
    ]
