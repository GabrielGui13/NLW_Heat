## Snippets VS Code

* Ctrl + Shift + P
* Preferences: Configure User Snippets
* New Global Snippets file...
* nome do projeto
* Dentro do projeto inserir os arquivos:
```json
{
	"Basic React Native Component": {
		"prefix": "rnbc",
		"body": [
			"import React from 'react';",
			"",
			"import {",
			"  View",
			"} from 'react-native';",
			"",
			"import { styles } from './styles';",
			"",
			"export function ${TM_DIRECTORY/.*[\\\\|\\/]+(.*)/$1/}(){",
			"  return (",
			"    <View>",
			"",
			"    </View>",
			"  );",
			"}"
		],
		"description": "Create the structure of a react native component"
	},

	"StyleSheet React Native Object": {
		"prefix": "rnso",
		"body": [
			"import { StyleSheet } from 'react-native';",
			"",
			"export const styles = StyleSheet.create({",
			"  container: {",
			"    flex: 1,",			
			"  }",			
			"});"
		],
		"description": "Create a style object with Stylesheet to separate file."
	}
}
```

## Pastas e Arquivos
* A src sao os arquivos criados por nos
* O App.tsx eh o componente mostrado na tela
* O app.json eh o arquivo de configuracao do aplicativo
* O assets da pasta raiz contem os arquivos de icon, splash, etc
* O assets do src tem as imagens utilizadas nos componentes
* A screens sao as telas criadas para mostrar na tela
* A pasta theme centraliza cores, fontes e etc


## Snippets
* rnbc => cria um componente padrao de react native
* rnso => cria um objeto style padrao de react native


## SVG
* expo install react-native-svg
* yarn add --dev react-native-svg-transformer
* Criar um arquivo metro.config.js na pasta raiz
* Inserir o codigo de https://github.com/kristerkari/react-native-svg-transformer
* Apos isso o arquivo SVG sera interpretado corretamente