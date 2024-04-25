const marketPlaceImage = {
  mintbase:
    "data:image/png;base64,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",
  tradeport:
    "data:image/png;base64,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",
  fewandfar: "https://production.cdn.fewfar.com/static/images/logo.svg",
  genadrop:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMwIiBoZWlnaHQ9IjI0MSIgdmlld0JveD0iMCAwIDIzMCAyNDEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMjIuNjc3IDIuMjA3MDNDMTUzLjI3NSAzNS42NDU2IDE4MS4wMDQgNjguMzkyMyAyMDAuODQ5IDEwOS40NTNDMjE1LjQyMSAxMzkuNjAxIDIxNC45MTggMTY4LjkwNyAyMDAuOTgyIDE5OC42NTdDMTk2LjMzNyAyMDguNTc3IDE4OC44ODkgMjE2LjA3NiAxNzkuODA3IDIyMS45MkMxNDEuODI4IDI0Ni4zNzUgMTAxLjg3MiAyNDYuNDA0IDY1Ljg0OTkgMjE5LjY4OUM1My4zMDA5IDIxMC4zODMgNDUuNzM5MiAxOTcuODUzIDQxLjc1ODkgMTgyLjk5N0M0MC44MTg0IDE3OS40OTggMzkuNDY5NSAxNzcuNDA4IDM1LjQ3OTcgMTc2LjAyN0MyMy4zNDg2IDE3MS44MjkgMTguMTA0OSAxNjAuNzc0IDE5LjkwMDMgMTQ1LjI0NkMyMC45NzM3IDEzNS45ODggMjguNjg3NCAxMjguODM5IDQwLjAyMDUgMTI3LjE2NUM0Mi45MTc4IDEyNi43NCA0NC4wMDA4IDEyNS41MjkgNDQuODM2OCAxMjIuOTc2QzU5LjIwMDIgNzguNjMzOCA4NS4wNjc2IDQxLjQyMiAxMTYuODgyIDcuOTI2NzFDMTE5LjEyNCA1LjU3MjAyIDExOS45NjkgNC43Nzk0OSAxMjIuNjc3IDIuMjA3MDNaIiBmaWxsPSIjMDIwMzAyIi8+CjxwYXRoIGQ9Ik0yMDYuOTQ0IDE1Mi43NzhDMjA1LjkzNyAxNjguMzI0IDIwNC4xMjMgMTgzLjY2MyAxOTYuMDQ4IDE5Ny41ODNDMTkyLjA2OCAyMDQuNDMgMTg3LjQwMyAyMTAuNTY3IDE4MC42NzggMjE0LjkwN0MxNjEuNDAzIDIyNy4zMjQgMTQwLjk3OSAyMzYuODM3IDExNy4zMzQgMjMzLjc5MkM5Mi45NzczIDIzMC42NjIgNzEuMzk0MiAyMjEuNjIyIDU2LjQyMjggMjAwLjc0MUM1Mi4wMzQgMTk0LjYxNCA1MC4yMSAxODcuNTEyIDQ3LjU5NzYgMTgwLjY5M0M0Ni42Mjg3IDE3OC4xNjkgNDguMjkxMSAxNzcuMzQ2IDUwLjM2MiAxNzYuNTg5QzU3LjIzOTcgMTc0LjA4MyA2MC41OTMxIDE2OC4yNjcgNjMuNjIzNSAxNjIuMTg3QzY0LjI0MSAxNjAuOTU3IDY0Ljc2MzQgMTU5LjUzIDYzLjQ0MyAxNTguNzE2QzYxLjcyMzYgMTU3LjY1NyA2MC42Nzg2IDE1OS4wNDcgNTkuODcxMSAxNjAuNDE4QzU5LjUzODcgMTYwLjk3NiA1OS4zMjAyIDE2MS41OTEgNTkuMDA2NyAxNjIuMTU4QzU0LjQyNzkgMTcwLjUwOSA0Ny4yNTU3IDE3NC4zODYgMzkuNDA5IDE3Mi43NTlDMzEuNjI4OCAxNzEuMTQyIDI1LjcxMDUgMTYzLjg0MiAyNS4wOTMxIDE1NC44NDhDMjQuNjM3MSAxNDguMDc4IDI0LjU1MTYgMTQxLjI4OCAzMC4wMTM4IDEzNi4wNzdDMzYuMzg4MSAxMzAuMDA2IDQzLjUyMjMgMTI5LjQ1OCA1Mi44MTI5IDEzNC4xMDFDNTQuMjI4NCAxMzQuODEgNTUuODA1MyAxMzYuODM0IDU3LjI4NzIgMTM0LjgyOUM1OC45NzgyIDEzMi41NSA1Ni43NDU4IDEzMC42NzcgNTUuMTMwOCAxMzAuNDAzQzQ2LjI5NjIgMTI4LjkgNDkuODc3NSAxMjMuNTA5IDUxLjU2ODUgMTE5LjE1QzY2LjI2NDQgODEuMjQ3NyA4Ny41NTMgNDcuMzgzNiAxMTQuOTk3IDE3LjM1ODhDMTIzLjg0MiA3LjY4NDcxIDEyMy45MTggNy44NTQ5MyAxMzIuNDIgMTguMDU4NkMxNTYuNTk2IDQ3LjA1MjYgMTc5LjI3MiA3Ny4wMyAxOTUuNDc4IDExMS4zOTVDMjAxLjcxOSAxMjQuNTUgMjA3LjM4MSAxMzcuNzYgMjA2Ljk0NCAxNTIuNzc4WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzUxOF80MikiLz4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF81MThfNDIpIj4KPHBhdGggZD0iTTI5LjExMDMgNi4wMjM0MkMyOC44MjY3IDYuNjMwMzcgMjguNjY3MiA3LjMxNTM0IDI4LjY2NzIgOC4wNDAwM0MyOC42NjcyIDEwLjUzNTYgMzAuNTU5IDEyLjU1ODYgMzIuODkyNyAxMi41NTg2QzM1LjIyNjQgMTIuNTU4NiAzNy4xMTgyIDEwLjUzNTYgMzcuMTE4MiA4LjA0MDAzQzM3LjExODIgNy4zMTUzNCAzNy4wMTc5IDYuNTkzNDcgMzYuNjc1MSA2LjAyMzIyQzM1LjI5OSAzLjczMzg4IDM0LjAxMzcgMS45NDM2NCAzMy4xODUgMS4zMTI3N0MzMy4wNzUgMS4yMjkwMiAzMi45MzA5IDEuMjIzMjkgMzIuODI0IDEuMzExQzMyLjA2MzIgMS45MzUzIDI5LjczNTQgNC42ODU1MiAyOS4xMTAzIDYuMDIzNDJaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfNTE4XzQyKSIgZmlsbC1vcGFjaXR5PSIwLjg5IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiLz4KPC9nPgo8cGF0aCBkPSJNNzMuMjk1NCA5NC45MjI4Qzc3LjExNDMgODIuOTQxMyA4MC45MzMxIDY5LjYzNTggOTEuMTM1NyA1OS40OTgzQzkzLjY2MjYgNTYuOTgyOSA5Ny4xNzc0IDU1LjQ4ODcgMTAwLjYzNSA1Ny40ODQxQzEwMy45NDEgNTkuMzg0OCAxMDQuNzg3IDYyLjk5NzMgMTA0LjM0IDY2LjUyNDZDMTAyLjgzOSA3OC41MzQ1IDk3Ljc2NjQgODkuMTgyNiA5MS4yNTkyIDk5LjIyNTVDOTAuMzM3NyAxMDAuNjUzIDg4Ljk4ODggMTAxLjgyNiA4Ny43NDQzIDEwMy4wMjdDODQuODI3OSAxMDUuODQ1IDgxLjU4ODYgMTA2LjcyNSA3Ny43MDMyIDEwNC44OUM3My45MTI5IDEwMy4wOTMgNzMuNDg1NCA5OS43OTI5IDczLjI5NTQgOTQuOTIyOFoiIGZpbGw9IiNEQUVFRTIiLz4KPHBhdGggZD0iTTczLjI5NTQgOTQuNjA5M0M3Ny4xMTQzIDgyLjYyNzggODAuOTMzMSA2OS4zMjIzIDkxLjEzNTcgNTkuMTg0OUM5My42NjI2IDU2LjY2OTQgOTcuMTc3NCA1NS4xNzUyIDEwMC42MzUgNTcuMTcwNkMxMDMuOTQxIDU5LjA3MTQgMTA0Ljc4NyA2Mi42ODM4IDEwNC4zNCA2Ni4yMTExQzEwMi44MzkgNzguMjIxIDk3Ljc2NjQgODguODY5MiA5MS4yNTkyIDk4LjkxMjFDOTAuMzM3NyAxMDAuMzQgODguOTg4OCAxMDEuNTEzIDg3Ljc0NDMgMTAyLjcxNEM4NC44Mjc5IDEwNS41MzIgODEuNTg4NiAxMDYuNDExIDc3LjcwMzIgMTA0LjU3N0M3My45MTI5IDEwMi43OCA3My40ODU0IDk5LjQ3OTUgNzMuMjk1NCA5NC42MDkzWiIgZmlsbD0iI0RBRUVFMiIvPgo8cGF0aCBkPSJNNzEuOTY2IDExNS4zMDhDNzUuMjMzOSAxMTQuOTc3IDc3LjIwOTggMTE2Ljc1NSA3Ny4wNzY4IDExOS42ODZDNzYuOTA1OSAxMjMuMjIzIDc1LjQyMzkgMTI2Ljc2OSA3MS4xMzk2IDEyNi44MDdDNjguMDE0MiAxMjYuODM2IDY1LjgwMDggMTI0LjM0OSA2NS45MzM4IDEyMS4yODVDNjYuMDg1OCAxMTcuODkgNjcuNjgxNyAxMTQuOTg2IDcxLjk2NiAxMTUuMzA4WiIgZmlsbD0iI0Q4RURFMCIvPgo8cGF0aCBkPSJNNzEuOTY2IDExNC45OTVDNzUuMjMzOSAxMTQuNjY0IDc3LjIwOTggMTE2LjQ0MSA3Ny4wNzY4IDExOS4zNzNDNzYuOTA1OSAxMjIuOTEgNzUuNDIzOSAxMjYuNDU2IDcxLjEzOTYgMTI2LjQ5NEM2OC4wMTQyIDEyNi41MjIgNjUuODAwOCAxMjQuMDM1IDY1LjkzMzggMTIwLjk3MUM2Ni4wODU4IDExNy41NzYgNjcuNjgxNyAxMTQuNjczIDcxLjk2NiAxMTQuOTk1WiIgZmlsbD0iI0Q4RURFMCIvPgo8cGF0aCBkPSJNNTEuMzQzOCAxNTMuMjg2QzUxLjE1MzggMTU1LjExMSA1MS45MjMzIDE1Ny43MyA0OS4zODY5IDE1OC4wOUM0Ni41NzUgMTU4LjQ4NyA0Ni44ODg1IDE1NS42NSA0Ni42MzIgMTUzLjkzOEM0Ni4xNTcgMTUwLjczMiA0NS4zMTE2IDE0OC4yMTcgNDEuNDM1NyAxNDcuNzkxQzM5LjQ2OTMgMTQ3LjU3NCAzNy4zOTg0IDE0Ni40MiAzOC4yOTE0IDE0My45OEMzOS4xODQzIDE0MS41NDEgNDEuNjU0MiAxNDIuNDk2IDQzLjMzNTcgMTQyLjkwMkM0OC4xNDI1IDE0NC4xMDMgNTEuMzA1OCAxNDguNDE2IDUxLjM0MzggMTUzLjI4NloiIGZpbGw9IiMwOTFEMTQiLz4KPHBhdGggZD0iTTE1Ni43MzIgMTgxLjMxMUMxNTYuNzc5IDE4Ny4yNjggMTU0LjM3NiAxOTEuOTIxIDE0OC42MjggMTkzLjk2NEMxNDIuNjkxIDE5Ni4wNzIgMTM2LjQ2OSAxOTYuNDEzIDEzMS43NTcgMTkxLjMzNUMxMjcuNTExIDE4Ni43NTggMTI2LjU0MiAxODEuMDU1IDEyOC43MjcgMTc1LjA4OEMxMzAuMjE4IDE3MS4wMTIgMTMzLjM5MSAxNjkuMzg2IDEzNy40OTUgMTcwLjU2OEMxMzkuNjIzIDE3MS4xODMgMTQxLjU2MSAxNzEuOTIgMTQzLjc1NSAxNzEuMjExQzE1My4yMjYgMTY4LjE1NiAxNTYuNzQxIDE3MC44ODkgMTU2LjczMiAxODEuMzExWiIgZmlsbD0iIzBCMEYwRiIvPgo8cGF0aCBkPSJNMTM4LjY2MSAxODEuOTE2QzE0My40MTEgMTgxLjU2NiAxNDcuMDExIDE4My41MzMgMTQ5LjYzMyAxODcuMzYzQzE1MC4zMzYgMTg4LjM5NCAxNTAuMDUxIDE4OS41MjggMTQ4Ljk4NyAxOTAuMTI0QzE0NC45MjEgMTkyLjQyMiAxNDAuNzUxIDE5Mi4wNjMgMTM2LjYxOSAxOTAuMzEzQzEzNC4wODIgMTg5LjIzNSAxMzEuODAyIDE4Ny4xMTcgMTMyLjI0OSAxODQuNTY0QzEzMi43OSAxODEuNDI0IDEzNi4xODIgMTgyLjA4NiAxMzguNjYxIDE4MS45MTZaIiBmaWxsPSIjRjRBNEM3Ii8+CjxwYXRoIGQ9Ik0xNTIuNjU2IDE4NS4xNTNDMTQ3LjI4OSAxNzkuMjA1IDE0MS40NzUgMTc3Ljg3MSAxMzQuOTExIDE3OC43NTFDMTMzLjcxNCAxNzguOTExIDEzMS44MjMgMTgwLjU5NSAxMzEuNTg2IDE3Ny43NThDMTMxLjQ0MyAxNzYuMDI3IDEzMi43NzMgMTc0LjM1MyAxMzQuMTEzIDE3NC41MTRDMTM5LjM1NiAxNzUuMTM4IDE0NC4yODcgMTc0LjI3OCAxNDkuNDI2IDE3My42NDRDMTUzLjkyOSAxNzMuMTA1IDE1My4yNDUgMTc5Ljg1NyAxNTIuNjU2IDE4NS4xNTNaIiBmaWxsPSIjQTA5RENBIi8+CjxwYXRoIGQ9Ik0xMjMuMjI5IDE0NS4zN0MxMjMuMTgxIDE1MS44ODUgMTE4LjA3MSAxNTcuMTUyIDExMy42OTEgMTYyLjcxM0MxMTMuMTAyIDE2My40NiAxMTEuMjc4IDE2My41ODMgMTEwLjA3MiAxNjMuNDdDMTAzLjIxMyAxNjIuODE3IDk2Ljg3NjkgMTYwLjYyMyA5MS43OTQ2IDE1NS44ODVDODcuNjE0OCAxNTEuOTg5IDg2LjEzMjkgMTQ2Ljg5MiA4OC43MDczIDE0MS43QzkxLjE4NjcgMTM2LjY4OCA5NS41NjYgMTM0LjUwNCAxMDEuMTkgMTM2Ljk2M0MxMDMuMDYxIDEzNy43NzYgMTAzLjk2NCAxMzYuOTYzIDEwNS4wNDcgMTM1Ljc2MkMxMDguNTIzIDEzMS45MTMgMTEyLjcwMyAxMzEuMDYyIDExNy4zNjggMTMzLjMxMkMxMjEuODUxIDEzNS40NjggMTIzLjA3NyAxMzkuNDk3IDEyMy4yMjkgMTQ1LjM3WiIgZmlsbD0iIzBCMEQwQyIvPgo8cGF0aCBkPSJNMTE5LjYwNiAxNDIuOTE4QzExOC45ODggMTQ5LjYzMiAxMTYuMzA5IDE1My43ODMgMTEzLjQ0IDE1Ny44NUMxMTIuMTM5IDE1OS43MDMgMTEwLjI5NiAxNTkuOTQgMTA4LjI1NCAxNTkuNTk5QzEwMi4yNTkgMTU4LjYxNiA5Ny4yODE2IDE1NS43MDMgOTMuMjM0OCAxNTEuMzA2QzkwLjc5MzQgMTQ4LjY1OCA5MC4yNTE5IDE0NS4zOTUgOTIuNTc5MyAxNDIuNDgzQzk0Ljg3ODIgMTM5LjU5OCA5OC4xMjcxIDEzOC45MDggMTAxLjE4NiAxNDEuMjYzQzEwMy45MDMgMTQzLjM1MyAxMDUuMzk0IDE0Mi41NTggMTA2LjY1OCAxMzkuODgyQzEwOC40OTEgMTM2LjAxNCAxMTEuNzQgMTM1LjIzOSAxMTUuMzUgMTM2LjU1M0MxMTguODg0IDEzNy44MzkgMTIwLjAwNSAxNDAuODQ3IDExOS42MDYgMTQyLjkxOFoiIGZpbGw9IiNGNEE0QzciLz4KPHBhdGggZD0iTTE1OS41NDYgMTM3Ljc4MUMxNTkuMjUyIDEzNC4wODMgMTYwLjcwNSAxMzAuOTUzIDE2NC4yODYgMTI4LjkyOUMxNjguMTcyIDEyNi43MzUgMTcxLjgyOSAxMjcuMzIyIDE3NC45NTUgMTMwLjNDMTc2LjY4MyAxMzEuOTQ2IDE3Ny45MjggMTMyLjYyNyAxODAuNDkzIDEzMS40OTJDMTgzLjk3IDEyOS45NTEgMTg3LjQwOSAxMzEuMzg4IDE4OS44MjEgMTM0LjE1OUMxOTIuNDYyIDEzNy4xOTQgMTkyLjU2NyAxNDAuNzc4IDE5MC44MjggMTQ0LjRDMTg4LjAxNyAxNTAuMjgyIDE3Ni45NTkgMTU2LjQ5NSAxNzAuODIyIDE1NS42MTZDMTY2LjQwNSAxNTQuOTkyIDE1OS42NiAxNDQuNTA0IDE1OS41NDYgMTM3Ljc4MVoiIGZpbGw9IiMwRjEzMTEiLz4KPHBhdGggZD0iTTE2My4xODYgMTM4LjU0NUMxNjMuMjMzIDEzNS44NzggMTYzLjQ4IDEzMy4zMjUgMTY2LjUzOSAxMzIuMjU2QzE2OS40NzUgMTMxLjIyNSAxNzIuMzM0IDEzMS40ODEgMTc0LjAwNiAxMzQuMTg1QzE3NS42NTkgMTM2Ljg3MSAxNzcuMTEyIDEzNy45MTEgMTgwLjA1NyAxMzYuMDAxQzE4Mi43OTMgMTM0LjIyMyAxODUuNTg2IDEzNC43MTUgMTg3LjUxNCAxMzcuMzE1QzE4OS41NTcgMTQwLjA2NyAxODguMTQxIDE0Mi44NTcgMTg2LjMyNyAxNDQuOTc1QzE4Mi42NiAxNDkuMjQgMTc3LjY1NCAxNTEuMzQgMTcyLjE0NCAxNTEuNzM3QzE2OC4wNjkgMTUyLjAzIDE2My4xNzYgMTQ0LjUwMiAxNjMuMTg2IDEzOC41NDVaIiBmaWxsPSIjRjRBNEM3Ii8+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfNTE4XzQyIiB4PSIyMC44MDc4IiB5PSIxLjI0NzU2IiB3aWR0aD0iMjQuMTY5NyIgaGVpZ2h0PSIyNy4wMjk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjcuODU5NDEiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMy45Mjk3Ii8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9Im91dCIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwLjA5NDc5MTcgMCAwIDAgMCAwLjUxMTQ5NCAwIDAgMCAwIDAuODc1IDAgMCAwIDEgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd181MThfNDIiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNTE4XzQyIiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNTE4XzQyIiB4MT0iMTE1LjkzNCIgeTE9IjEwLjI1MSIgeDI9IjExNS45MzQiIHkyPSIyMzQuMzY1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMxODc1RjEiLz4KPHN0b3Agb2Zmc2V0PSIwLjc5MjE3MiIgc3RvcC1jb2xvcj0iIzUyQkJGOCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3MkY5RkQiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzUxOF80MiIgeDE9IjMyLjg5MjciIHkxPSIxLjQ2NzQ4IiB4Mj0iMzIuODkyNyIgeTI9IjUuMTE5OTEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMC43MyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K",
};
const currentChainProps = {
  near: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
    livePrice: "near",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/near-mainnet",
    chain: "near",
    id: "1112",
    explorer: "https://explorer.near.org/?query=",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
  },
  aurora: {
    img: "https://s2.coinmarketcap.com/static/img/coins/200x200/14803.png",
    id: "1313161554",
    chain: "Aurora",
    explorer: "https://aurorascan.dev/",
    livePrice: "ethereum",
    contract: "0xe93097f7C3bF7A0E0F1261c5bD88F86D878667B5",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/aurora-mainnet",
  },
  arbitrum: {
    img: "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg?1680097630",
    id: "42161",
    contract: "0x27E52A81975F5Fb836e79007E3c478C6c0E6E9FB",
    chain: "Arbitrum",
    explorer: "https://arbiscan.io/",
    livePrice: "ethereum",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/arbitrum",
  },
  celo: {
    img: "https://assets.coingecko.com/coins/images/11090/large/InjXBNx9_400x400.jpg?1674707499",
    id: "42220",
    livePrice: "celo",
    contract: "0x5616BCcc278F7CE8B003f5a48f3754DDcfA4db5a",
    explorer: "https://explorer.celo.org/address/",
    chain: "Celo",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/celo-mainnet",
  },
  polygon: {
    img: "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp",
    id: "137",
    chain: "Polygon",
    livePrice: "matic-network",
    contract: "0x57Eb0aaAf69E22D8adAe897535bF57c7958e3b1b",
    explorer: "https://polygonscan.com/address/",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/polygon-mainnet",
  },
  aptos: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBinSwbRdx76qY4A3qvVkM9g_mKoGCBDT0sqTT02TgRvKquV2Vlc8fSRmLyuhBS3-CaA&usqp=CAU",
  },
  sui: {
    img: "https://blog.sui.io/content/images/2023/04/Sui_Droplet_Logo_Blue-3.png",
  },
};
const chains = ["polygon", "aurora", "arbitrum", "celo"];
const chainState = chains.find((data) => data.includes(props.state.chainState));
if (chainState) {
  let response = fetch(currentChainProps[props.state.chainState]?.subgraph, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
              query MyQuery {
               nfts(where: {tokenID: "${props.state.tokenId}"}) {
                  category
                  chain
                  createdAtTimestamp
                  id
                  isSold
                  isListed
                  price
                  tokenID
                  owner {
                      id
                  }
                  tokenIPFSPath
                  transactions {
                    price
                  }
                  }
              }
          `,
    }),
  });
  const collectionData = response.body.data.nfts;
  if (collectionData) {
    const nftBody = collectionData.map((data) => {
      const fetchIPFSData = fetch(
        data.tokenIPFSPath.replace("ipfs://", "https://ipfs.io/ipfs/")
      );
      if (fetchIPFSData.ok) {
        const nft = fetchIPFSData.body;
        let nftObject = {};
        nftObject.contract_id = data.id;
        nftObject.sold = data.isSold;
        nftObject.isListed = data.isListed;
        nftObject.owner = data.owner.id;
        nftObject.price = data.price;
        nftObject.token_id = data.tokenID;
        nftObject.name = nft?.name;
        nftObject.description = nft?.description;
        nftObject.attributes = nft?.properties;
        nftObject.image = nft?.image.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );
        return nftObject;
      }
    });
    State.update({
      title: nftBody[0].name,
      imageUrl: nftBody[0].image,
      owner: nftBody[0]?.owner,
      description: nftBody[0]?.description,
      price: nftBody[0].price,
    });
  }
}
const Label = styled.p`
  font-size: 1.1rem;
  color: #04111d;
  font-weight: 600;
  font-family: "SF Pro Display", sans-serif;
  line-height: 1.02;
  white-space: nowrap;
  margin: unset;
`;
const GrayLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
`;
const SecondaryText = styled.h3`
  font-size: 1.1rem;
  color: #0f1d40;
  font-weight: 600;
  font-family: "SF Pro Display", sans-serif;
  line-height: 1.02;
  white-space: nowrap;
  padding-bottom: 3px;
`;
const Card = styled.div`
  overflow: hidden;
`;
const BorderedShadowedCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  -ms-flex-flow: column nowrap;
  background-color: "#f0f0f0";
  margin: 0 auto;
  border: 1.41429px solid rgba(28, 27, 28, 0.1);
  padding: 1rem;
  width: 100%;
  height: fit-content;
  background-color: #fff;
  & img {
    border-radius: inherit;
  }
`;
const Main = styled.div`
  display: grid;
  gap: 3rem;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  // background: linear-gradient(180deg,#e4f1fb,hsla(0,0%,85.1%,0));
  margin-top: 20px;
  width: 100%;
  padding: 1rem;
`;
const ImgCard = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 500px;
  width: 100%;
  max-width: 500px;
  border-radius: inherit;
  overflow: hidden;
  aspect-ratio: 1/1;
  margin: 0 auto;
  & > img {
    object-fit: cover;
    width: 100%;
  }
  object-fit: cover;
`;
const TopSellCard = styled.div`
  background-color: #e2e4e8;
  padding: 1rem;
  width: 100%;
`;
const Text = styled.p`
  font-size: 14px;
  margin: unset;
`;
const GrayCard = styled.div`
  background-color: #e2e4e8;
  cusor: not-allowed;
`;
const ChainCard = styled.div`
  display: flex;
  background-color: #eff3f9;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  max-width: 320px;
  width: 80%;
  margin: 1rem auto;
  height: 60px;
  & img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin-right: 5px;
  }
`;
const ChainCardMarket = styled.div`
  display: flex;
  background-color: #eff3f9;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: 140px;
  margin: 1rem;
  height: 60px;
  & img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin-right: 5px;
  }
`;
const PriceInput = styled.div`
  display: flex;
  padding: 0.2rem;
  & > input {
    border: none;
    outline: none;
    background: none;
    width: 70px;
    padding: 0 0.2rem;
    &:focus,
    &:active {
      border: none;
      box-shadow: none;
    }
  }
  & > img {
    width: 20px;
    object-fit: contain;
    margin: 0 0.5rem;
  }
`;
const Markets = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const MarketOption = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BlueSub = styled.div`
  color: #0d99ff;
  font-size: 0.8rem;
`;
const loadingAnimation = styled.keyframes`
  0% {
    content: "Loading";
  }
  25% {
    content: "Loading.";
  }
  50% {
    content: "Loading..";
  }
  75% {
    content: "Loading...";
  }
`;
const ListButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  width: 120px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
  &.loading {
    background: #0056b5;
    cursor: not-allowed;
  }
  &.loading::before {
    content: "Loading";
    animation: ${loadingAnimation} 1s infinite;
    display: inline-block;
  }
`;
const ListedMarkets = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    background: #eff3f9;
    padding: 7px 10px;
    border-radius: 12px;
    margin-right: 20px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
`;
State.init({
  amount: 0,
});
const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      currentChainProps[props.state.chainState].livePrice
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(4) !== "NaN" ? `$${value.toFixed(2)}` : 0;
  }
};
const keywordsToCheck = [
  "tradeport",
  "mintbase",
  "fewandfar",
  "paras",
  "genadrop",
];
const matchedKeyWords = (inputString) => {
  return keywordsToCheck.find((keyword) => inputString.includes(keyword));
};
const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}
return (
  <>
    <div className="container-fluid">
      <Main>
        <BorderedShadowedCard className="shadow-sm rounded-4">
          <div>
            <SecondaryText>
              {state.title
                ? state.title
                : props.state.tokenInfo.metadata.title || "NFT Name"}
            </SecondaryText>
          </div>
          <ImgCard className="shadow-sm">
            {state.imageUrl ? (
              <img src={state.imageUrl} alt="nft_image" />
            ) : (
              <Widget
                src="mob.near/widget/NftImage"
                props={{
                  nft: {
                    tokenId: props.state.tokenId,
                    contractId: props.state.contractId,
                  },
                  className: "col-lg-12",
                }}
              />
            )}
          </ImgCard>
          <div className="d-flex justify-content-between mt-3">
            <span>
              <BlueSub>Contract ID</BlueSub>
              <SecondaryText>
                {props.state.contractId.length > 6
                  ? `${props.state.contractId?.slice(
                      0,
                      6
                    )}...${props.state.contractId?.slice(
                      props.state.contractId.length - 4
                    )}`
                  : props.state.contractId || "Sample Contract"}
              </SecondaryText>
            </span>
            <span>
              <BlueSub>Collection Name</BlueSub>
              <SecondaryText className="font-weight-bold">
                {props.state.nftMetadata.name || "- - - - - -"}
              </SecondaryText>
            </span>
          </div>
          <div className="card rounded-4 shadow-sm p-3 my-3">
            <SecondaryText>Description</SecondaryText>
            <p>
              {props.state.tokenInfo.metadata.description ?? state.description}
            </p>
          </div>
          <p>
            <a href={props.state.tokenInfo.media} target="_blank">
              {props.state.tokenInfo.media}
            </a>
          </p>
          <div className="col-lg-12">
            {Object.keys(props.state.tokenInfo.approved_account_ids || {})
              .length > 0 && <h3> Listed Markets</h3>}
            <div>
              <ListedMarkets>
                {typeof props.state.tokenInfo.approved_account_ids ===
                  "object" &&
                  Object.keys(props.state.tokenInfo.approved_account_ids).map(
                    (key) => (
                      <li>
                        <img
                          src={marketPlaceImage[matchedKeyWords(key)]}
                          alt=""
                        />
                        <a
                          href={props.marketLinks[matchedKeyWords(key)].link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on {matchedKeyWords(key)}
                        </a>
                      </li>
                    )
                  )}
              </ListedMarkets>
            </div>
          </div>
        </BorderedShadowedCard>
        <div className="">
          <Card className="card rounded-4 shadow-sm border">
            <TopSellCard className="d-flex align-items-center">
              <Label>List Method</Label>
            </TopSellCard>
            <div className="p-3">
              <GrayLabel>
                Choose how you want to list you NFT for sale
              </GrayLabel>
              <div className="d-flex justify-content-between">
                <div
                  className="card rounded-4 shadow-sm p-3"
                  role="button"
                  style={{ borderColor: "#0D99FF" }}
                >
                  <Label className="text-center">SET PRICE</Label>
                  <Text>Sell the NFT at a fixed price</Text>
                </div>
              </div>
            </div>
          </Card>
          <div className="">
            <input
              type="hidden"
              placeholder={props.state.contractId}
              onChange={(e) => props.onChangeContract(e.target.value)}
            />
          </div>
          <div className="">
            <input
              type="hidden"
              placeholder={props.state.tokenId}
              onChange={(e) => props.onChangeToken(e.target.value)}
            />
          </div>
          <div className="rounded-4 mt-3 border shadow-sm">
            <div className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <Label>List Price</Label>
                <div className="d-flex align-items-center gap-3">
                  <span>{getUsdValue(props.state.amount / 1e24 || 0)}</span>
                  <PriceInput className="border rounded">
                    <img
                      src={
                        currentChainProps[props.state.chainState || "near"].img
                      }
                    />
                    <input
                      type="number"
                      placeholder={props.state.amount / 1e24}
                      onChange={(e) => {
                        props.chainState && props.chainState !== "near"
                          ? props.onChangeEVMAmount(e.target.value)
                          : props.onChangeAmount(e.target.value);
                      }}
                    />
                  </PriceInput>
                </div>
              </div>
            </div>
            {!state.title && (
              <>
                <hr className="m-auto" />
                <GrayLabel className="mt-3 mx-3 mb-0">
                  Select any of the NEAR marketplace where you want your NFTs to
                  be listed on
                </GrayLabel>
                <div className="p-3">
                  <MarketOption>
                    <Markets>
                      <ChainCardMarket
                        className={`${
                          props.state.genadrop ? "border border-primary" : ""
                        } rounded-3 p-2`}
                        onClick={props.selectGenadrop}
                        onChange={props.selectGenadrop}
                      >
                        <img src={marketPlaceImage.genadrop} />
                        Genadrop
                      </ChainCardMarket>
                      <ChainCardMarket
                        className={`${
                          props.state.mintbase ? "border border-primary" : ""
                        } rounded-3 p-2`}
                        onClick={props.selectMintbase}
                        onChange={props.selectMintbase}
                      >
                        <img src={marketPlaceImage.mintbase} />
                        Mintbase
                      </ChainCardMarket>
                      <ChainCardMarket
                        className={`${
                          props.state.fewfar ? "border border-primary" : ""
                        } rounded-3 p-2`}
                        onClick={props.selectFewFar}
                        onChange={props.selectFewFar}
                      >
                        <img src={marketPlaceImage.fewandfar} />
                        Few & Far
                      </ChainCardMarket>
                      <ChainCardMarket
                        className={`${
                          props.state.tradeport ? "border border-primary" : ""
                        } rounded-3 p-2`}
                        onClick={props.selectTradeport}
                        onChange={props.selectTradeport}
                      >
                        <label
                          className="form-check-label"
                          htmlFor="myCheckbox"
                        >
                          <img src={marketPlaceImage.tradeport} />
                          Tradeport
                        </label>
                      </ChainCardMarket>
                    </Markets>
                  </MarketOption>
                  <div className="">
                    <ChainCard
                      onClick={props.selectCustom}
                      className={`form-check rounded-4 p-3 ${
                        props.state.custom ? "border border-primary" : ""
                      }`}
                    >
                      <label className="form-check-label" htmlFor="myCheckbox">
                        Custom Marketplace
                      </label>
                    </ChainCard>
                    {props.state.custom && (
                      <div className="">
                        Custom Marketplace
                        <input
                          type="text"
                          placeholder={props.state.customMarketLink}
                          onChange={(e) =>
                            props.onChangeCustomMarket(e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>
                  <GrayLabel>
                    * You will pay some gas in Ⓝ to deposit NEAR to marketplace
                    address then list your NFT
                  </GrayLabel>
                </div>
                {props.state.custom && !props.state.validMarketLink && (
                  <div className="alert alert-danger">
                    <i className="bi bi-x"></i> Not a Valid NEAR Contract for
                    your custom Marketplace
                  </div>
                )}
              </>
            )}
          </div>
          <div className="d-flex flex-column align-items-center text-center">
            {props.state.ownsNFT || state.owner === state.sender ? (
              <ListButton
                type="button"
                className="btn btn-primary mt-3"
                disabled={props.loadingListing}
                className={props.loadingListing ? "loading" : ""}
                onClick={
                  props.chainState && props.chainState !== "near"
                    ? props.evmList
                    : props.list
                }
              >
                {!props.loadingListing && "List"}
              </ListButton>
            ) : (
              <button type="button" className="btn btn-secondary mt-3">
                You Can Only List An NFT You Own
              </button>
            )}
          </div>
          {props.state.error && (
            <div className="bg-danger p-2 mt-4 rounded">
              <p className="text-center text-white pt-2">
                Something went wrong when Listing this NFT
              </p>
            </div>
          )}
        </div>
      </Main>
    </div>
  </>
);
