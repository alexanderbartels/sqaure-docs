import sade from 'sade';
import colors from 'kleur';

const prog = sade('square-docs').version('__VERSION__');

prog
	.command('test')
	.describe('Test command to verify sade works as expected')
	.option('--verbose', 'Log more stuff', false)
	.action(async ({ verbose }) => {
		console.log(
			`\nRun ${colors
				.bold()
				.cyan('npm run build - w packages/cli')} to build the cli locally. Verbose? `,
			verbose
		);
	});

prog.parse(process.argv, { unknown: (arg) => `Unknown option: ${arg}` });
