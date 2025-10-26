package main

import "codegen/generator"

func main() {
	g := generator.Generator{}
	g.Generate(&generator.GenerateRequest{
		Models: generator.Models,
		Path:   "../../../",
	})
}
