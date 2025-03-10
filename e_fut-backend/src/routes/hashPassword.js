  //teste com a senha criptografada no banco de dados
  
  const bcrypt = require('bcryptjs');

  const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 11);
  };

  hashPassword('0220'); 
