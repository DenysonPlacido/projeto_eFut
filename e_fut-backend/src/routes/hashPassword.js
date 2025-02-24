// conferencia de senhas

  const bcrypt = require('bcryptjs');

  const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 11);
    // console.log(hashedPassword);
  };

  hashPassword('0220'); 
