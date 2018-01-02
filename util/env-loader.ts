// TODO: Fix typing on the return
const loadEnviromentVariables = (configToLoad: object): any =>
  Object.keys(configToLoad).reduce((loadedConfig: any, currentKey: string) => {
    const valueToAdd = process.env[currentKey] || configToLoad[currentKey];

    if (!valueToAdd) {
      throw Error(
        `Error loading enviroment variable: ${currentKey}: does not exist and no default value supplied`
      );
    }

    if (valueToAdd === configToLoad[currentKey]) {
      console.warn(
        `No enviroment variable detected for: ${currentKey}, using default supplied value: ${valueToAdd}`
      );
    }

    return { ...loadedConfig, [currentKey]: valueToAdd };
  }, {});

export default loadEnviromentVariables;
