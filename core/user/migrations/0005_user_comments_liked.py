# Generated by Django 5.0.6 on 2024-07-08 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_comment', '0001_initial'),
        ('core_user', '0004_user_posts_liked'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='comments_liked',
            field=models.ManyToManyField(related_name='commented_by', to='core_comment.comment'),
        ),
    ]