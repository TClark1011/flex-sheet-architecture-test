import { execSync } from "child_process";
import chalk from "chalk";

try {
	execSync("docker -v", {
		shell: "pipe", // Prevents error from getting printed to console
	});
} catch {
	console.log("\n");
	console.warn(
		chalk.yellow(
			`${chalk.bold(
				"WARNING:"
			)} It appears you do not have docker installed. This project uses docker to run the development database, so it is recommended that you install it before continuing. You can find installation instructions at https://docs.docker.com/get-docker/.`
		)
	);
}
