import { computed } from "vue";
import { Router } from "vue-router";
import { RouteItemTypes } from "@/utils/enums";

const routeTypes = Object.values(RouteItemTypes) as string[];

export default function (router: Router) {
  const routes = computed(() => {
    return router.options.routes.filter((rt) => rt.meta !== undefined);
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routesByType = {} as any;

  for (const rType of routeTypes) {
    routesByType[rType] = routes.value
      .filter((r) => r.meta?.type === rType)
      .map((r) => ({
        name: (r.name as string) || "",
        meta: {
          color: (r.meta?.color as string) || "",
          icon: (r.meta?.icon as string) || "",
          title: (r.meta?.title as string) || "",
          type: (r.meta?.type as string) || "",
          value: (r.meta?.value as string) || "",
        },
      }));
  }
  return routesByType;
}
