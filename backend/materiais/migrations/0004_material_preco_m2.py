# Generated by Django 4.2.4 on 2024-10-05 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('materiais', '0003_alter_material_nome'),
    ]

    operations = [
        migrations.AddField(
            model_name='material',
            name='preco_m2',
            field=models.FloatField(null=True),
        ),
    ]
