from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
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
    try:
        app.mount("/static", StaticFiles(directory=static_dir), name="static")
    except Exception:
        pass  # Игнорируем ошибку, если директория не доступна

def get_static_file_path(filename: str):
    """Получить путь к статическому файлу с проверкой для разных окружений"""
    # Основной путь (относительно текущего файла)
    file_path = os.path.join(static_dir, filename)
    if os.path.exists(file_path):
        return file_path
    
    # Альтернативные пути для разных окружений
    current_file = os.path.abspath(__file__)  # webapp/app/main.py
    current_dir = os.path.dirname(current_file)  # webapp/app/
    
    alt_paths = [
        os.path.join(current_dir, "static", filename),  # webapp/app/static/
        os.path.join(os.getcwd(), "webapp", "app", "static", filename),
        os.path.join(os.path.dirname(current_dir), "static", filename),
    ]
    
    # Попробуем найти файл
    for alt_path in alt_paths:
        abs_path = os.path.abspath(alt_path)
        if os.path.exists(abs_path):
            return abs_path
    
    return file_path

def read_html_file(filename: str) -> str:
    """Прочитать HTML файл"""
    file_path = get_static_file_path(filename)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"File {filename} not found")

@app.get("/", response_class=HTMLResponse)
async def root():
    try:
        return HTMLResponse(content=read_html_file("index.html"))
    except HTTPException:
        # Fallback на FileResponse
        return FileResponse(get_static_file_path("index.html"))

@app.get("/tokenomics", response_class=HTMLResponse)
async def tokenomics():
    try:
        return HTMLResponse(content=read_html_file("tokenomics.html"))
    except HTTPException:
        return FileResponse(get_static_file_path("tokenomics.html"))

@app.get("/roadmap", response_class=HTMLResponse)
async def roadmap():
    try:
        return HTMLResponse(content=read_html_file("roadmap.html"))
    except HTTPException:
        return FileResponse(get_static_file_path("roadmap.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 