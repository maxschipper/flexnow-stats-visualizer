{
  description = "FlexNow Stats Visualizer Dev Shell";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            bun
            # nodejs_22
            typescript-language-server
            vscode-langservers-extracted
          ];

          shellHook = ''
            echo "Dev Shell"
            echo "Run 'bun install' to start."
            echo "Run 'bun run dev' to start the server."
          '';
        };
      }
    );
}
