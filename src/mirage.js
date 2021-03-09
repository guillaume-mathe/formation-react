import {Model, Server, RestSerializer} from "miragejs";

export const API_NAMESPACE="/api";

const mockData=[{date:"...",nom:""},{date:"...",nom:""}];

export function makeServer({environment = "test"} = {}) {
    console.log("Mirage init..");
    return new Server({
        environment,

        serializers: {
            tache: RestSerializer.extend({
                root: false,
                embed: true
            })
        },

        models: {
            tache: Model
        },

        routes() {
            this.namespace = API_NAMESPACE;
            this.timing = 1000; // global timing

            this.get("/tache/list", (schema, request) => {
                    return schema["taches"].all();
                },
                {timing: 500});

            this.post("/tache", (schema, request) => {
                    const newTache = JSON.parse(request.requestBody);
                    return schema["taches"].create(newTache);
                },
                {timing: 2000});

            this.delete("/tache/:id", (schema, request) => {
                schema["taches"].find(request.params.id).destroy();
            });
        }
    });
}
