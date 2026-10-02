from rest_framework import viewsets, filters
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description", "category", "difficulty"]
