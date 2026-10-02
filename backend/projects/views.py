from rest_framework import viewsets, filters
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "description", "category", "difficulty"]


from pathlib import Path
from django.http import FileResponse

def home(request):
    frontend = Path(__file__).resolve().parents[2] / "frontend" / "index.html"
    return FileResponse(open(frontend, "rb"), content_type="text/html")
