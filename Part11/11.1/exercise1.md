I have chosen Java as the programming language for this scenario. In a typical Continuous Integration (CI) setup, there are several key steps: linting, testing, and building.

For **linting**, SonarQube is a powerful tool used to detect and fix code quality and security issues. It performs static code analysis and can be integrated into the CI pipeline to ensure that code meets defined standards before being merged into the main branch.

For **testing**, **JUnit** is widely used. It is a popular testing framework for Java that supports unit testing and helps ensure that individual components of the code behave as expected. It can be easily integrated with build tools and CI workflows, making it a reliable choice for automated testing.

For **building**, **Maven** is commonly used. It is a build automation tool and dependency manager that compiles code, runs tests, and packages the application for deployment.

As an alternative to Jenkins and GitHub Actions, **GitLab CI** can be used. One of its main advantages is the use of containers to isolate jobs, improving consistency and scalability. It also integrates seamlessly with Kubernetes, making it suitable for modern cloud-native application environments.

The decision between a self-hosted or cloud-based CI setup depends on security requirements, project size, and system load.
