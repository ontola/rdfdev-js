touch docs/.nojekyll
echo 'js.rdf.dev' > docs/CNAME

projects=( "actions" "collections" "delta" "iri" "prop-types" )
for i in "${projects[@]}"
do
  cp ./docRedirect.html ./docs/$i.html
  fileName=$(echo $i | tr - _)
  sh -c "sed -i '' -- 's/packageName/${fileName}/g' ./docs/$i.html"
done
