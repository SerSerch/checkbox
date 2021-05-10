const incstr = require('incstr');

const createUniqueIdGenerator = () => {
  const uniqIds = {};

  const generateNextId = incstr.idGenerator({
    alphabet: 'abcefghijklmnopqrstuvwxyzABCEFGHJKLMNOPQRSTUVWXYZ',
  });

  return (name) => {
    if (!uniqIds[name]) {
      uniqIds[name] = generateNextId();
    }

    return uniqIds[name];
  };
};

const localNameIdGenerator = createUniqueIdGenerator();
const componentNameIdGenerator = createUniqueIdGenerator();

module.exports = (localName, resourcePath) => {

  const componentName = resourcePath
    .split('/')
    .slice(-2, -1)[0];

  const localId = localNameIdGenerator(localName);
  const componentId = componentNameIdGenerator(componentName);

  return `${componentId}_${localId}`;
};