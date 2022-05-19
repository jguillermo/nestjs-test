import { ProcessValue } from './process-json/processValue';

export function toJson(data: string): any {
  let dataJson = {};
  try {
    dataJson = JSON.parse(data);
  } catch (error) {
    throw new Error('JSON parse Error:' + error);
  }
  return processData(dataJson);
}

export function processData(data: any): any {
  if (Array.isArray(data)) {
    data.forEach((element, index) => {
      data[index] = processData(element);
    });
  } else if (data != null && data.constructor.name === 'Object') {
    const claves = Object.keys(data);
    for (let i = 0; i < claves.length; i++) {
      const clave = claves[i];
      data[clave] = processData(data[clave]);
    }
  } else {
    data = ProcessValue.getInstance().process(data);
  }
  return data;
}
