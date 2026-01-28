/*▄─────────────────────────────────────────▄
  █                                         █
  █  Создает правило инициализации движков  █
  █                                         █
  ▀─────────────────────────────────────────▀*/
module.exports = new class Engines {
/*┌──────────────────────────┐
  │ Определяет путь к движку │
  └──────────────────────────┘*/
    path = ([ engines ], [ engine ]) => {
        return [
            engines,            // Имя директории движков
            engine,             // Имя директории движка
            `${engine}-engine`, // Имя файла движка
        ];
    }
    
/*┌───────────────────────┐
  │ Инициализирует движок │
  └───────────────────────┘*/
    init = (protocol, engine) => {
    // Сохраняем ссылку на основной протокол
        engine.protocol = protocol;
    }
    
/*┌─────────────────────────────────┐
  │ Регистрирует движок в протоколе │
  └─────────────────────────────────┘*/
    register = (protocol, engine, scopePath, [ engineName ]) => {
    // Проверяем имя движка в протоколе
        if (engineName in protocol) {
            throw new Error(
                `Ошибка в протоколе "${protocol.constructor.name}"!`,
                `Имя движка "${engineName}" уже существует!`,
            );
        }
        
    // Проходим по списку методов
        Object.keys(engine).forEach((method) => {
        // Добавляем только методы
            if (typeof engine[method] == 'function') {
                protocol[method] = engine[method];
            }
        });
    }
};
