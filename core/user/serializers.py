from core.abstract.serializers import AbstractSerializer
from core.user.models import User

from django.conf import settings
from rest_framework import serializers


class UserSerializer(AbstractSerializer):
    posts_count = serializers.SerializerMethodField()

    def get_posts_count(self, instance):
        return instance.post_set.all().count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation['image']:
            representation['image'] = settings.DEFAULT_IMAGE_URL
            return representation
        if settings.DEBUG:  # debug enabled for dev
            request = self.context.get('request')
            representation['image'] = request.build_absolute_uri(representation['image'])
        return representation
    class Meta:
        model = User
        # List of all the fields that can be included in a request or a response
        fields = ['id', 'username','name', 'first_name',
                  'last_name', 'bio', 'image','posts_count',
                  'email', 'is_active', 'created', 'updated']
        # List of all the fields that can only be read by the user
        read_only_field = ['is_active']
