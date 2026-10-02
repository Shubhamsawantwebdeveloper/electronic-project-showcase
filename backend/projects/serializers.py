from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "title", "category", "description", "components",
            "working", "circuit_diagram", "video_url", "source_code",
            "difficulty", "image", "image_url", "created_at"
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
