package utils

import "fmt"

func ArgsAssigner(s string) string {
	count := 1
	for i := range s {
		if s[i] == '?' && s[i-1] == '$' {
			s = s[:i] + fmt.Sprintf("%d", count) + s[i+1:]
			count++
		}
	}

	return s
}
