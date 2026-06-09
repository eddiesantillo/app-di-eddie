{ pkgs, ... }: {
  channel = "stable-23.11";
  packages = [ pkgs.nodejs_20 ];
  idx.previews = {
    enable = true;
    previews = [
      {
        command = [ "npm" "run" "dev" "--" "--port" "$PORT" ];
        manager = "web";
        id = "web";
      }
    ];
  };
}