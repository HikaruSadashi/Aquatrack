{ pkgs }: {
  deps = [
    pkgs.vimHugeX
    pkgs.nodejs-16_x
    pkgs.nodejs-16_x
    pkgs.sudo
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
    pkgs.go_1_18
    pkgs.gopls
  ];
}