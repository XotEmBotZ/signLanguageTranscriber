# Unmaintained since Apr 7, 2024

# GestureCom: Bridging the Communication Gap

## Explore your world of sign with us!

GestureCom is a privacy-first, offline-capable sign language transcriber. It comes with a pre-built model to get started and also offers the user the ability to train their own custom models. All data is processed on the device and never leaves the device.

Enjoy a privacy-focused, partially offline experience by checking out the following features:

1.  **Start detecting sign language:** Use our pre-trained model or try your custom model.

2.  **Start training your custom model:** Collect and train your own custom model.

## How to Run (with Docker Compose)

To get GestureCom up and running quickly using Docker Compose, follow these steps:

1.  **Clone the repository:**

    ```
    git clone [Link to your GitHub repository]
    cd [Your project directory name]

    ```

2.  **Build and run with Docker Compose:**

    ```
    docker compose up --build

    ```

    This command will build the necessary Docker images and start the services defined in your `docker-compose.yml` file.

3.  **Access the application:**
    Once the services are running, you can access GestureCom in your web browser at `http://localhost:[Your_Port_Number]`. (Replace `[Your_Port_Number]` with the port you've exposed in your `docker-compose.yml` file, typically 3000 for Next.js applications).

## Default Model

The default model can recognize 7 general signs:

* yes

* no

* hello

* peace

* i love you

* thank you

* please

Check it out by yourself here: \[Link to your deployed project/demo if available]

## Use Cases

* Facilitate communication with differently-abled people on the fly.

* Used as a communication tool between children and elders.

* Used in public places to facilitate communication between common people and differently-abled people.

* Used by emergency services to understand the situation of a differently-abled person.

* Many more...

## Technologies Used

* **TensorFlow (Python)**

    * **Machine Learning:** Used `tensorflow-python` to learn and train the initial models.

* **TensorFlow (JavaScript)**

    * **Machine Learning:** Used `tensorflow-js` to facilitate the training and running of both pre-built and custom models right in your device.

* **MediaPipe (Web)**

    * **Landmark Detection:** Used MediaPipe to detect both pose and hand landmarks. This eliminates the requirement to store or process personally identifiable information by converting images to points in space.

* **HTML**

    * **Web:** Used to make the skeleton of the site.

* **JavaScript**

    * **Web:** JavaScript is used to run and handle user interaction on the web. This also facilitates the interface with WebGL.

* **CSS**

    * **Web:** CSS is used to style the site and make it look pretty.

* **WebGL**

    * **Web | Computing:** WebGL is used to run the models directly on the machine. This eliminates the slow VM of JS and can handle large datasets with ease.

* **Git**

    * **Version Control:** Git is used to manage different code versions and allowed for easy finding and rectifying of mistakes. It also acted as a backup to safeguard the source code.

* **Python**

    * **Computing:** Python is used to explore the initial idea and train the first few models.

* **Next.js**

    * **Web:** Next.js is used to streamline the development experience and facilitate faster iteration.

* **GitHub**

    * **Version Control | Publishing:** GitHub is used as remote code storage.