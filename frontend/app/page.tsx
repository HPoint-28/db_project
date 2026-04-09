"use client";

import "./global.css";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkAuthService = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/");
      const data = await response.json();
      setMessage(data.status);
    } catch (error) {
      console.error(error);
      setMessage("Ошибка: не удалось связаться с сервисом");
    } finally {
      setLoading(false);
    }
  };

  const checkShopService = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8001/shop/");
      const data = await response.json();
      setMessage(data.status);
    } catch (error) {
      console.error(error);
      setMessage("Ошибка: не удалось связаться с сервисом");
    } finally {
      setLoading(false);
    }
  };

  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        alert("Улетело в микросервис!");
        setName("");
      }
    } catch (err) {
      console.error("Ошибка отправки:", err);
    }
  };

  return (
    <html>
      <head>
        
      </head>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-zinc-50">
      <h1 className="text-2xl font-bold text-black">Тест микросервисов</h1>
      <h1>Auth</h1>
      <button
        onClick={checkAuthService}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Загрузка..." : "Проверить Auth Service"}
      </button>
      <h1>sell</h1>
      <button
        onClick={checkShopService}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Загрузка..." : "Проверить Auth Service"}
      </button>

      {message && (
        <div className="p-4 bg-white border border-zinc-200 rounded-lg shadow-sm">
          <p className="text-zinc-800">Ответ сервера: <strong>{message}</strong></p>
        </div>
      )}
    </div>
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите имя..."
        className="border p-2 text-black"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Отправить в Docker
      </button>
    </form>
      </body>
    </html>
  );
}