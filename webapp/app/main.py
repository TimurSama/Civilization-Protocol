from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .routes import users, admin
import os

app = FastAPI(title="VOD.eco MVP")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение маршрутов
app.include_router(users.router, prefix="/api")
app.include_router(admin.router, prefix="/admin")

# Статические файлы
static_dir = os.path.join(os.path.dirname(__file__), "static")
# Проверяем существование директории для Vercel
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

def get_static_file(filename: str):
    """Получить путь к статическому файлу с проверкой"""
    # Основной путь
    file_path = os.path.join(static_dir, filename)
    if os.path.exists(file_path):
        return file_path
    
    # Fallback для разных окружений (Vercel, локальное и т.д.)
    current_dir = os.path.dirname(__file__)  # webapp/app/
    base_dir = os.path.dirname(os.path.dirname(current_dir))  # корень проекта
    
    alt_paths = [
        os.path.join(base_dir, "webapp", "app", "static", filename),
        os.path.join(os.getcwd(), "webapp", "app", "static", filename),
        os.path.join("webapp", "app", "static", filename),
    ]
    
    for alt_path in alt_paths:
        abs_path = os.path.abspath(alt_path)
        if os.path.exists(abs_path):
            return abs_path
    
    # Если файл не найден, возвращаем основной путь
    # FastAPI выбросит 404, что правильно
    return file_path

@app.get("/")
async def root():
    return FileResponse(get_static_file("index.html"))

@app.get("/tokenomics")
async def tokenomics():
    return FileResponse(get_static_file("tokenomics.html"))

@app.get("/roadmap")
async def roadmap():
    return FileResponse(get_static_file("roadmap.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 