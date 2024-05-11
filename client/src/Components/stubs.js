const stubs = {};

stubs.cpp = `#include <bits/stdc++.h>
using namespace std;

int main() {
  cout<<"Hello world!";
  return 0;
}
`;

stubs.py = `print("Hello world!")`;

stubs.c = `#include <stdio.h>
#include <stdlib.h>

int main(){
    printf("Hello World");
    return 0;
}
`;
export default stubs;