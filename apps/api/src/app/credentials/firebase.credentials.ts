export const private_key = `
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD4ESzNQfhHi5q2\npIEHmDmsonOwhxmzS0fvp6OLqSlxqQBzlw0HPw88K/PjDEYR/JRbLnVflsE7A7EL\nJaA87+QIs2qPshhEP2agO+0wkgHL7o/pKOXDCzGi6tCU3Vqx6t3PfFZO+MmtY/uu\nBRxP19pr9sVs0UJMsyyi+EGsJub/IumuLAW0r40dX4aSLUJ9h4BttJxpQ78Ub9cC\nMxjwbmgJ4D1snnxCkpLpk3ChfzcmM4nXq+nKmDGTEw3wnuweIBV4BytA4q35/kte\nVemA0Wz42LafHTdgZAOtPtrs3P5hhdCAmLjIUJmM2Y+3LMT8P9T4i4SeOnaH3AUa\nsyerfaydAgMBAAECggEAOKlno9y5MtJi/Ov3Yv400kdrCHvbdXYxEL8oXpq9ki4p\nob1zZt/TAYoCk652hN4+HtOuUK61JV8y/dpSzwh2fDxLD1Z9L32R2fDGPU1kZqnv\nqjDCxnnUlSNwkEg9Up1Um/OJHVG7c0T+tGGLdXtW80kzECd+LtnQTMtK6OEb61Oh\nj90PBkzobY/DTreCpHqOBRS0F72dENGExY0bxjHLDu5qiAIoeHg72mmiK8BWYl5b\nED+sNriU0fo2Gt3RS6V4v8jW02fiubCVVAsW2bIzxaHKCls89wRJNt/NfnrYbk26\ntL2+RIP6Ow0aldSLzftnumK+nJGQScqQWH2YAlAIgQKBgQD9UHZ6G3HnqWJ7MUYo\nxpYI0KS9/9cB0FXT60lshO2wLH/kUU6nLPPFEPO2L9XCv0frSZxZMCHSPAKRLWXE\np7S+W1G73eDqhmplqAGVwztZAagFT4YSq/180gu0f35RBIaCih3jfGWaNHEMUbRO\n4uDYoutxBepEjuNsyaJJoyMOXQKBgQD6snhrCjSc4sJ/+fsYLPlXrJynRxlA3w5q\nbqu+XwsStlnviEDaE22HgWX1TPHrcz8VhyF0H2vJMm69k2IgXbhiUVhvgsTqELNS\nJnk3e+7TkqzqHpB6FErjDCBxgZqERBYXkEqBHmyHMK0HIUArbNke3ai/PJzCw61N\ntfCUbfyzQQKBgQDq9F3f5mLhQAADSfHMUl3JMVUMkidoHEfvdxY0XJtmQ/Af4rZ0\nY0J7r7yNaJL5vpfDihRFuVo1eMncxGHXZMJFqcgG28cJYMGBJrLJqTr71Ih23Ir7\n+KD2zJBky7hrByqIG/mbDb/jpu6QQZxfaxqodXyx6Y2gJ3SUa/VmHbWfVQKBgCO3\nc5KEdLR5Vg6Xld9+4NNN40+twHpOjSY6uDs6HUDAPBX1SpAHPo6Ur+r/2GOcGru9\ncdWyeE/E4KQfsFY+I/vV7QyOC/HxCStGEfUGsiLwfbQpQJoz8+tfGewx88quTJt0\n0jiNFhc4px4h7ZuCOXi9ScJdJ1RUPoeYyTrMZLlBAoGAL67QKhM/UV1Azfkp8I7r\nbCMqQIKnVr4KFpMZ4h63FGtw7PjAIiQNdALra/Mn5NwydlbT3ScvqILJKqxv50iU\nZfaDDJd2gO0hmh2c80SA53DnwZ/0/kSfIECGh5zEHeht4Xrq02ttWdvTzxpOYCxC\nEWS1bW6tzbvF8ld7ZDl9mOo=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-12z6k@lospollos-69f3b.iam.gserviceaccount.com"
`.split(String.raw`\n`).join('\n');

export const  projectId = "lospollos-69f3b";

export const client_email = "firebase-adminsdk-12z6k@lospollos-69f3b.iam.gserviceaccount.com"


export const firebaseSettings = {
    projectId: projectId,
    credentials: {client_email: client_email,private_key: private_key}
}