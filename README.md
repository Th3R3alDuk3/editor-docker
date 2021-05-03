# OCI

`O`nline `C` `I`nterpreter  
  
This is an online **c-editor** that uses a **server side c-interpreter**.  
  
The project was equipped with some useful techniques and plugins such as websockets or the [monaco-editor](https://microsoft.github.io/monaco-editor/) from Microsoft.  
We use the [tcc-compiler](https://bellard.org/tcc/) from Fabrice Bellard because it is best suited for our purposes.  
  
Feel free to use a different interpreter or programming language. You hardly have to change anything!

![alt text](https://github.com/Th3R3alDuk3/oncco/blob/main/app.gif "OnCCo")

## install tcc-compiler

At first you need to [download](http://download.savannah.gnu.org/releases/tinycc/) the [tcc-compiler](https://bellard.org/tcc/) by Fabrice Bellard.  
Use the [latest version 0.9.27](http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2) and run the following commands.

```
curl -fSL -O -J http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2
tar -xjf tcc-0.9.27.tar.bz2

cd tcc-0.9.27
```

In the corresponding folder there is also a README for the further steps.

```
./configure

make 
make test
make install

tcc -v
```

## start nodejs

After installation of the [tcc-compiler](https://bellard.org/tcc/) install all other dependencies and start nodejs.

```
npm install
npm start
```
