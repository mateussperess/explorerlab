// visa
// inicia com 4 seguido de 15 dígitos

4234234423432344

// ^4\d{0,15}

// master
// inicia com 5 seguido de um dígito entre 1 e 5, seguido de mais 2 dígitos
// ^5[1-5]\d{0,2}

// OU
// inicia com 22, seguido de um dígito entre 2 e 9, seguido de mais 1 dígito
// ^22[2-9]\d

// OU
// inicia com 2, seguido de um dítigo entre 3 e 7, seguido de mais 2 dígitos
// ^2[3-7]\d{0,2}

// +
// 12 dígitos

5353535353535353
2323232323232323
2232392392392992

// (^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}

// ^3[47]

347
