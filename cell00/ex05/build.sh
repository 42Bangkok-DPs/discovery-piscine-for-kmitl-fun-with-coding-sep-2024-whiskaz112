if [ $# -eq 0 ]; then
  echo "No arguments supplied"
  exit 1
fi

for folder_name in "$@"
do
  new_folder="ex$folder_name"
  mkdir "$new_folder"
done
