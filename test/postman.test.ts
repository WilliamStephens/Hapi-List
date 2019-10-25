import postmanCollection from "./postman-collection.json";
import Newman from "newman";

test("basic", done => {
  try {
    Newman.run(
      {
        collection: postmanCollection,
        reporters: "cli"
      },
      (error: Error, summary: Newman.NewmanRunSummary) => {
        if (error) {
        }
        expect(summary.run.failures.length).toEqual(0);
        done();
      }
    );
  } catch (error) {}
});
