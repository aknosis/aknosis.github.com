aknosis.com

   This project was originally an octopress project (see source branch) and then was butchered to add a themed index.html. This third incanation is just another updated index.html. Eventually the source markdown should be pulled out of the source branch and a new static generator chosen. Until then this project will remain hard coded.
 
 To run locally:
    
    docker container run --rm -p 8080:80 -v $PWD/:/usr/share/nginx/html:ro nginx

