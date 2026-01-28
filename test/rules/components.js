/*▄─────────────────────────────────────────────▄
  █                                             █
  █  Создает правило инициализации компонентов  █
  █                                             █
  ▀─────────────────────────────────────────────▀*/
module.exports = new class Components {
/*┌──────────────────────────────┐
  │ Определяет путь к компоненту │
  └──────────────────────────────┘*/
    path = ([ engines, units, components ], [ engine, unit, component ]) => {
        return [
            engines,    // Имя директории движков
            engine,     // Имя директории движка
            units,      // Имя директории логических единиц
            unit,       // Имя директории логической единицы
            components, // Имя директории компонентов
            component,  // Имя файла компонента
        ];
    }
    
/*┌──────────────────────────────────┐
  │ Опции инициализации по умолчанию │
  └──────────────────────────────────┘*/
    defaultOptions = { INIT_PROTOCOL: true, INIT_ENGINE: true, INIT_UNIT: true }
    
/*┌──────────────────────────┐
  │ Инициализирует компонент │
  └──────────────────────────┘*/
    init = (unit, component, options) => {
    // Сохраняем ссылку на основной протокол
        if (options.INIT_PROTOCOL) {
            component.protocol = unit.protocol;
        }
        
    // Сохраняем ссылку на движок
        if (options.INIT_ENGINE) {
            component.engine = unit.engine;
        }
        
    // Сохраняем ссылку на логическую единицу
        if (options.INIT_UNIT) {
            component.unit = unit;
        }
    }
    
/*┌─────────────────────────────────────────────┐
  │ Регистрирует компонент в логической единицы │
  └─────────────────────────────────────────────┘*/
    register = (unit, component, scopePath, [ engineName, unitName, componentName ]) => {
    // Переводим первый символ в верхний регистр
        unitName = unitName.charAt(0).toUpperCase() + unitName.slice(1);
        
    // Получаем имя компонента в логической единицы
        componentName = `${componentName}${unitName}`;
        
    // Проверяем имя компонента в логической единицы
        if (componentName in unit) {
            throw new Error([
                `Ошибка в логической единицы "${unit.constructor.name}"!`,
                `Имя компонента "${componentName}" уже существует!`,
            ].join('\n'));
        }
        
    // Регистрируем компонент в логической единицы
        unit[`${componentName}`] = component;
    }
};
