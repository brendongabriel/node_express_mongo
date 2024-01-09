import { autor } from "../models/Autor.js";

class AutorController {

  static async listarAutores(req, res) {
    try {
      const autores = await autor.find();
      res.status(200).json(autores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      if (autorEncontrado != null) {
        res.status(200).json(autorEncontrado);
      } else {
        res.status(404).json({ message: "autor não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "autor cadastrado com sucesso", autor: novoAutor });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      if (req.body == null) {
        res.status(400).json({ message: "Body inválido" });
      }
      const id = req.params.id;

      const autorAtual = await autor.findById(id);

      if (autorAtual == null) {
        return res.status(404).json({ message: "autor não encontrado" });
      }
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado com sucesso" });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removerAutor(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      if (autorEncontrado != null) {
        await autor.findByIdAndDelete(id);
        res.status(200).json({ message: "autor removido com sucesso" });
      } else {
        res.status(404).json({ message: "autor não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default AutorController;
