process CREATE {
    label "process_low"

    conda "conda-forge::nodejs"
    container "docker.io/node:20.9.0-bookworm"

    cache false

    output:
    path("report")

    script:
    """
    cp -r $moduleDir/app ./app
    cd app
    npm install && npm run build
    sed -i 's/type="module"//g' dist/app/browser/index.html
    cp -r dist/app ../report
    """
}