# Electronic Project Showcase

A mini project website for showcasing Arduino, Robotics, Home Automation, IoT and Sensor projects.

## Technology
- Frontend: HTML, CSS, JavaScript
- Backend: Python Django + Django REST Framework
- Database: PostgreSQL (default) or MySQL
- Media: Django media uploads

## 1. Create environment
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

## 2. Install
```bash
pip install -r requirements.txt
```

## 3. Database
PostgreSQL example:
```sql
CREATE DATABASE electronic_showcase;
```

Then edit `backend/config/settings.py` with your database username/password.

For MySQL, install `mysqlclient` and change ENGINE to `django.db.backends.mysql`.

## 4. Run migrations
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Open:
- Website: `frontend/index.html` (or serve frontend with a local server)
- API: http://127.0.0.1:8000/api/projects/
- Admin: http://127.0.0.1:8000/admin/

## API
GET `/api/projects/`
GET `/api/projects/<id>/`
POST `/api/projects/`
PUT `/api/projects/<id>/`
DELETE `/api/projects/<id>/`

The API accepts JSON for text fields. Image upload can be added through Django admin or multipart requests.

## Frontend
The frontend uses JavaScript `fetch()` to load projects from the Django API. If opening HTML directly causes browser CORS/file restrictions, use VS Code Live Server or:
```bash
cd frontend
python -m http.server 5500
```
Then open http://127.0.0.1:5500/
