# Generated by Django 4.2.4 on 2024-11-18 02:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0008_cliente_telefone'),
        ('orcamentos', '0004_remove_orcamento_material_orcamento_pecas'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orcamento',
            name='cliente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientes.cliente'),
        ),
    ]