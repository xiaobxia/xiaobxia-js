Object.isExtensible(a);//判断是否可扩展
Object.preventExtensions(a);//设为不可扩展，不可逆的

Object.seal(a);//对象设为不可扩展，且自有属性也不能配置，可读写（不能配置指不能修改特性）
Object.isSealed(a);//检测

Object.freeze(a);//对象设为不可扩展，且自有属性也不能配置,且只读
Object.isFrozen(a);//检测

